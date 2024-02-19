import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmationModalProps {
  isOpen?: boolean;
  title?: string;
  message?: string;
  confirmationText?: string;
  cancellationText?: string;
  confirmButtonStyle?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link';
  handleConfirm?: () => void;
  handleReject?: () => void;
}

function ConfirmationModal({
  isOpen = false,
  title = '',
  message = '',
  confirmationText = 'Confirm',
  cancellationText = 'Cancel',
  confirmButtonStyle = 'primary',
  handleConfirm,
  handleReject,
}: ConfirmationModalProps) {
  return (
    <Modal show={isOpen} onHide={handleReject}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant={confirmButtonStyle} onClick={handleConfirm}>
          {confirmationText}
        </Button>
        <Button variant="secondary" onClick={handleReject}>
          {cancellationText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
