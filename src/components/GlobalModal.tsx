'use client';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import modalStore from '@/store/modalStore';
import { ModalButtonObject } from '@/interfaces/modal';

export default function GlobalError() {
  const showModal = modalStore((state) => state.showModal);
  const closeModal = modalStore((state) => state.closeModal);
  const modalObject = modalStore((state) => state.modalObject);

  const handleClose = (event: object, reason: string) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      closeModal();
    }
  };

  return (
    <Dialog
      open={showModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ '& .MuiDialog-paper': { maxWidth: modalObject?.maxWidth ?? 360 } }}
    >
      {modalObject && (
        <>
          <Box ref={modalObject?.componentRef}>
            <DialogTitle id="alert-dialog-title" sx={{ fontSize: '20px', fontWeight: 500 }}>
              {'title' in modalObject ? modalObject.title : 'Default Title'}
            </DialogTitle>
            <DialogContent sx={{ padding: '0px 24px', my: 2 }}>
              {'description' in modalObject ? modalObject.description : 'Default Description'}
            </DialogContent>
          </Box>
          <Box>
            <DialogActions>
              {modalObject.actions
                ? modalObject.actions.map((btns: ModalButtonObject) => {
                    return (
                      <Button
                        key={btns.text}
                        variant={btns.variant}
                        onClick={btns.onClick}
                      >
                        {btns.text}
                      </Button>
                    );
                  })
                : null}
            </DialogActions>
          </Box>
        </>
      )}
    </Dialog>
  );
}