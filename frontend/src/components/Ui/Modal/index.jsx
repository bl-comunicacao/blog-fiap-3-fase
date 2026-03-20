import Button from "../Button"

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
    <div className="fixed inset-0 bg-[rgba(3,7,18,0.75)] flex items-center justify-center p-[1.6rem] z-[999]" onClick={onClose}>
      <div className="w-full max-w-[48rem] bg-[#0f172a] border border-[rgba(255,255,255,0.08)] rounded-[0.8rem] p-[2.4rem]" onClick={(event) => event.stopPropagation()}>
        <h3 className="m-0 mb-[1.2rem] text-[2rem] font-medium text-[var(--white-light)]">{title}</h3>
        <p className="m-0 text-[1.6rem] leading-[1.5] text-[var(--gray-5)]">{message}</p>

        <div className="mt-[2.4rem] flex justify-end gap-[1.2rem]">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button type="button" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Processando..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
