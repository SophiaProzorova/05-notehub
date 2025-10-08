import { createPortal } from "react-dom";
import { useEffect } from "react";

import css from "./Modal.module.css"

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return (()=> {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    })

  }, [onClose])

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {children}
      </div>
    </div>
  , document.body);
};

export default Modal;
