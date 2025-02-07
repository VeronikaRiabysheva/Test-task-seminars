import { PropsWithChildren } from "react";
import "../components/ModalEdit.css";
import ReactDOM from "react-dom";

type ModalPropsEdit = {
  isEditOpen: boolean;
  onClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  editValue: EditValueType;
  setEditValue: (value: EditValueType) => void;
  errors: newErrorsType;
};

interface EditValueType {
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

interface newErrorsType {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  photo?: string;
}

const ModalEdit = ({
  isEditOpen,
  onClose,
  handleSubmit,
  editValue,
  setEditValue,
  errors,
  children,
}: PropsWithChildren<ModalPropsEdit>) => {
  if (!isEditOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          Х
        </button>
        <div className="edit-form-header">
          <p>Редактирование информации</p>
          <form action="" method="POST" onSubmit={handleSubmit}>
            {/*проверяем на ошибки */}
            <div className="form-seminars-edit">
              <label>Название:</label>
              <input
                type="text"
                name="title"
                placeholder="Введите название"
                value={editValue.title}
                onChange={(e) =>
                  setEditValue({ ...editValue, title: e.target.value })
                }
              />
              {/* при изменении данные сохраняются в editValue */}
              {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
              <label>Описание:</label>
              <input
                type="text"
                name="description"
                placeholder="Добавьте описание"
                value={editValue.description}
                onChange={(e) =>
                  setEditValue({ ...editValue, description: e.target.value })
                }
              />
              {errors.description && (
                <p style={{ color: "red" }}>{errors.description}</p>
              )}
              <label>Дата:</label>
              <input
                type="text"
                name="date"
                placeholder="Укажите дату"
                value={editValue.date}
                onChange={(e) =>
                  setEditValue({ ...editValue, date: e.target.value })
                }
              />
              {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
              <label>Время:</label>
              <input
                type="text"
                name="time"
                placeholder="Укажите время в формате ЧЧ:ММ"
                value={editValue.time}
                onChange={(e) =>
                  setEditValue({ ...editValue, time: e.target.value })
                }
              />
              {errors.time && <p style={{ color: "red" }}>{errors.time}</p>}
              <label>Фото:</label>
              <input
                type="text"
                name="photo"
                placeholder="Вставьте ссылку на фотографию"
                value={editValue.photo}
                onChange={(e) =>
                  setEditValue({ ...editValue, photo: e.target.value })
                }
              />
              {errors.photo && <p style={{ color: "red" }}>{errors.photo}</p>}
              <div className="btn-edit">
                <button type="submit">Отправить</button>
              </div>
            </div>
          </form>
        </div>
        {children}
      </div>
      <div onClick={onClose}></div>
    </div>,
    document.body
  );
};

export default ModalEdit;
