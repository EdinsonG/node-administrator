'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Delete, Visibility, Add, ArrowBack } from '@mui/icons-material';
import { TableRow, TableCell, IconButton, Box, Typography } from '@mui/material';
import { useGraph } from '@/hooks/useGraph';
import modalStore from '@/store/modalStore';
import NodeList from '@/components/NodeList';
import { alertStore } from '@/store/alertStore';
import useLoadingStore from '@/store/loadingStore';
import { useLocaleController } from '@/app/providers';
import { GlobalAlert } from '@/components';

export default function Page() {
  const t = useTranslations();
  const { locale } = useLocaleController();
  const { nodes, loading, currentParentId, fetchNodes, handleCreateNode, handleVerifyChildsNode, handleDeleteNode } = useGraph(locale);
  const setModal = modalStore((state) => state.setModal);
  const closeModal = modalStore((state) => state.closeModal);
  const setAlert = alertStore((state) => state.setAlert);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const hasParent = useMemo(() => nodes.some(node => node.parent !== null), [nodes]);

  const dynamicHeaders = useMemo(() => {
    const baseHeaders = [
      { id: 'id', headerName: t("headers.ID") },
      { id: 'parent', headerName: t("headers.parentID") },
      { id: 'title', headerName: t("headers.title") },
      { id: 'actions', headerName: t("headers.actions") }
    ];

    return hasParent ? baseHeaders : baseHeaders.filter(h => h.id !== 'parent');
  }, [t, hasParent]);

  const handleViewChildren = async (nodeId: number | null) => {
    try {
      await fetchNodes(nodeId);
    } catch (error) {
      setAlert({
        title: t("generic.info"),
        description: t("alerts.noChildren", { item: nodeId ?? t("headers.root") }),
        severity: "warning"
      });
    }
  };

  const nodeCreate = (parentId: number | null = null) => {
    setModal({
      title: t("modals.titleNew"),
      description: parentId ? t("modals.descriptionNewChild", { item: parentId }) : t("modals.descriptionNewParent"),
      actions: [
        {
          text: t("modals.create"),
          variant: 'contained',
          onClick: async () => {
            setLoading(true);
            try {            
              const response = await handleCreateNode(parentId);
              setAlert({
                title: t("generic.success"),
                description: response?.id ? t("alerts.createSuccess", { item: response.id }) : t("alerts.createRootSuccess"),
                severity: "success"
              });
              closeModal();
            } catch (error) {
              setAlert({
                title: t("generic.error"),
                description: t("alerts.genericError"),
                severity: "error"
              });
            } finally {
              setLoading(false);
            }
          },
        },
        { text: t("modals.cancel"), variant: 'outlined', onClick: closeModal }
      ],
    });
  };

  const nodeVerify = async (nodeId: number) => {
    setLoading(true);
    try {
      const data = await handleVerifyChildsNode(nodeId);
      if (data && data.length > 0) {
        setAlert({
          title: t("generic.info"),
          description: t("alerts.hasChildrenError", { item: nodeId }),
          severity: "warning"
        });
      }

    } catch (error) {
      confirmDelete(nodeId);
    } finally {
      setLoading(false);
    }
  }

  const confirmDelete = (nodeId: number) => {
    setModal({
      title: t("modals.titleDelete"),
      description: t("modals.descriptionDelete", { item: nodeId }),
      actions: [
        {
          text: t("modals.delete"),
          variant: 'contained',
          onClick: async () => {
            setLoading(true);
            try {
              await handleDeleteNode(nodeId);
              setAlert({
                title: t("generic.success"),
                description: t("alerts.deleteSuccess", { item: nodeId }),
                severity: "success"
              });
              closeModal();
              fetchNodes(currentParentId);
            } catch (error) {
              setAlert({ title: t("generic.error"), description: t("alerts.genericError"), severity: "error" });
            } finally { setLoading(false); }
          }
        },
        { text: t("modals.cancel"), variant: 'outlined', onClick: closeModal }
      ]
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">{t("generic.nodes")}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t("headers.currentLevel", { item: currentParentId ?? t("headers.root") })}
          </Typography>
        </Box>
      </Box>

      <NodeList headers={dynamicHeaders} loading={loading}>
        {nodes.map((node) => (
          <TableRow key={node.id} hover>
            <TableCell align="center" padding="none" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, width: '30px' }}>{node.id}</TableCell>
            {hasParent && ( <TableCell align="center" padding="none" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, width: '30px' }}>{node.parent}</TableCell> )}
            <TableCell align="center" padding="none" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, width: '30px' }}>{node.title}</TableCell>
            <TableCell align="center" padding="none" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, width: '30px' }}>
              {currentParentId !== null && (
                <IconButton sx={{ color: '#444746' }} onClick={() => handleViewChildren(null)} title={t("buttons.goBack")}>
                  <ArrowBack />
                </IconButton>
              )}
              <IconButton sx={{ color: '#1976D2' }} onClick={() => handleViewChildren(node.id)} title={t("buttons.childNode")}>
                <Visibility />
              </IconButton>
              <IconButton sx={{ color: '#2E7D32' }} onClick={() => nodeCreate(node.id)} title={t("buttons.addNode")}>
                <Add />
              </IconButton>
              <IconButton sx={{ color: '#D32F2F' }} onClick={() => nodeVerify(node.id)} title={t("buttons.deleteNode")}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </NodeList>

      <GlobalAlert />
    </Box>
  );
}