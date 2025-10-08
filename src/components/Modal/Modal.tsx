import NoteForm, { type NoteFormProps } from "../NoteForm/NoteForm";
import css from "./Modal.module.css"


const Modal = (noteFormProps: NoteFormProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      noteFormProps.onCancel();
    }
  };

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm {...noteFormProps} />
      </div>
    </div>

  )
};

export default Modal;
