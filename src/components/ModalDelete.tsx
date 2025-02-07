import { PropsWithChildren } from "react";
import "../components/ModalDelete.css";
import ReactDOM from "react-dom";

type ModalProps = {
  isDeleteOpen: boolean;
  onClose: () => void;
  deleteSeminar: (id: string) => Promise<void>;
  seminarToDelete: string | null;
  setIsDeleteOpen: (isDeletOpen: boolean) => void;
};

const ModalDelete = ({
  isDeleteOpen,
  onClose,
  deleteSeminar,
  seminarToDelete,
  setIsDeleteOpen,
  children,
}: PropsWithChildren<ModalProps>) => {
  if (!isDeleteOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          Х
        </button>
        <p>Вы действительно хотите удалить?</p>
        <div className="btn-container">
          <button
            onClick={() => {
              if (seminarToDelete) {
                // если есть id, то удаляем по id
                deleteSeminar(seminarToDelete);
              }
              setIsDeleteOpen(false); // и закрываем окно
            }}
          >
            да
          </button>
          <button onClick={() => setIsDeleteOpen(false)}>нет</button>
        </div>
        {children}
      </div>
      <div onClick={onClose}></div>
    </div>,
    document.body
  );
};

export default ModalDelete;
