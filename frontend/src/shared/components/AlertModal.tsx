import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface AlertModalProps {
  type: string;
  message: string;
  onClose: () => void;
}

const AlertModal = ({ type, message, onClose }: AlertModalProps) => {
  const variant = type === 'danger' ? 'danger' : 'info';

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{type === 'danger' ? 'Error' : 'Success'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={variant} onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
