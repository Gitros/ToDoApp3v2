type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal = ({ children, title, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <dialog
      open
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="w-[90vw] max-w-md rounded-2xl p-5 shadow-2xl bg-white"
      aria-modal="true"
      aria-label={title ?? "Dialog"}
    >
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </dialog>
  );
};

export default Modal;
