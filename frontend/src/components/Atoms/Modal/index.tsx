import { FC, ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-75" onClick={onClose}></div>
      <div className="bg-white p-4 rounded shadow-md">{children}</div>
    </div>
  );
};

export default Modal;
