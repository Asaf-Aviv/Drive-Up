import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { createPortal } from 'react-dom';
import { CloseOutlined } from '@material-ui/icons';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';

interface ModalProps {
  closeModal: () => void;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, closeModal, onClose }) => {
  useLockBodyScroll();

  useEffect(() => onClose, [onClose]);

  const container = document.querySelector('#modals');

  if (!container) {
    throw new Error('Could not find createPortal container (#modals)');
  }

  return createPortal(
    <StyledModal onClick={closeModal}>
      <IconButton type="button" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <ChildContainer onClick={e => e.stopPropagation()}>
        {children}
      </ChildContainer>
    </StyledModal>,
    container
  );
};

const ChildContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const CloseIcon = styled(CloseOutlined)`
  display: flex;
  &.MuiSvgIcon-root {
    height: 100%;
    width: 100%;
  }
`;

const IconButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: absolute;
  top: 5rem;
  right: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  color: ${({ theme }) => theme.textColors.secondary};
  &:hover ${CloseIcon} {
    color: #fff;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 8rem 4rem;
  z-index: 1200;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 300ms;
`;

export default Modal;
