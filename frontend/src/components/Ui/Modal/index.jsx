import Button from "../Button"
import { Overlay, ModalContainer, Title, Message, Actions } from "./styles"

const Modal = ({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onClose,
  isLoading = false,
}) => {
  if (!open) return null

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <Title>{title}</Title>
        <Message>{message}</Message>

        <Actions>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button type="button" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Processando..." : confirmLabel}
          </Button>
        </Actions>
      </ModalContainer>
    </Overlay>
  )
}

export default Modal
