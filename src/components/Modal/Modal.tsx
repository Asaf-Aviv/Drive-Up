import React from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { CloseOutlined } from '@material-ui/icons'
import { useLockBodyScroll } from 'hooks'
import { fadeIn } from '../global/animations'

type Props = {
  closeModal: () => void
  className?: string
  children: React.ReactNode
}

const Modal = ({ closeModal, className, children }: Props) => {
  useLockBodyScroll()

  const container = document.querySelector('#modals')

  if (!container) {
    return null
  }

  return createPortal(
    <StyledModal className={className} onClick={closeModal}>
      <IconButton type="button">
        <CloseIcon />
      </IconButton>
      {children}
    </StyledModal>,
    container,
  )
}

const CloseIcon = styled(CloseOutlined)`
  display: flex;
  &.MuiSvgIcon-root {
    height: 100%;
    width: 100%;
  }
`

const IconButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: fixed;
  top: 4.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  padding: 0.25rem;
  color: ${({ theme }) => theme.textColors.secondary};
  transition: background 150ms;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    ${CloseIcon} {
      color: #FFF;
    }
  }
`

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1200;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 300ms;
  @media (min-width: 600px) {
    padding: 2rem;
  }
`

export default Modal
