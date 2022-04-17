import styled from '@emotion/styled';
import { Modal } from '@mui/material';
import * as React from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode
}

const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 2px solid grey;
`;

function ImageModal ({ isOpen, onClose, children }: ImageModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Modal>
  );
}

export default ImageModal;
