import { useState, useEffect, useCallback } from 'react';
import { nodeService } from '@/services/nodeService';
import { CreateNodePayload, GraphNode } from '@/interfaces';

export function useGraph(currentLocale: string) {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);
  
  const apiLocale = currentLocale === 'es' ? 'es_ES' : 'en_US';

  const fetchNodes = useCallback(async (parentId: number | null) => {
    setLoading(true);
    try {
      const request = parentId ? nodeService.getChildNodes(parentId, apiLocale) : nodeService.getParentNodes(apiLocale);
      const { data } = await request;
      setNodes(data);
      setCurrentParentId(parentId);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiLocale]);

  const handleCreateNode = async (parentId: number | null) => {
    setLoading(true);
    try {
      const payload: CreateNodePayload = {
        parent: parentId,
        locales: [apiLocale],
      };
      const { data } = await nodeService.createNode(payload);
      await fetchNodes(currentParentId);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyChildsNode = async (nodeId: number) => {
    try {
      const { data } = await nodeService.getChildNodes(nodeId, apiLocale);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteNode = async (nodeId: number) => {
    setLoading(true);
    try {
      const { data } = await nodeService.deleteNode(nodeId);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes(currentParentId);
  }, [fetchNodes, apiLocale]);

  return { nodes, loading, currentParentId, fetchNodes, handleCreateNode, handleVerifyChildsNode, handleDeleteNode };
}