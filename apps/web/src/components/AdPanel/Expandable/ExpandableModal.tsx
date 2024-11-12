import { Modal, ModalV2, useMatchBreakpoints } from '@pancakeswap/uikit'
import { ReactNode } from 'react'

interface ExpandableModalProps {
  title: string
  isOpen: boolean
  onDismiss: () => void
  expandableContent?: ReactNode
}

export const ExpandableModal = ({ title, isOpen, expandableContent, onDismiss }: ExpandableModalProps) => {
  const { isDesktop } = useMatchBreakpoints()
  return (
    <>
      <ModalV2 isOpen={isOpen} onDismiss={onDismiss} closeOnOverlayClick>
        <Modal title={title} onDismiss={onDismiss} maxWidth={isDesktop ? '438px' : 'unset'}>
          {expandableContent}
        </Modal>
      </ModalV2>
    </>
  )
}
