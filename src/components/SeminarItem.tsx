import { PropsWithChildren } from "react";
import "./seminarItem.css";

type SeminarProps = {
  seminars: SeminarType[];
  setSeminarToEdit: (id: string) => void;
  setIsEditOpen: (isOpen: boolean) => void;
  setSeminarToDelete: (id: string | null) => void;
  setIsDeleteOpen: (isDeleteOpen: boolean) => void;
};

interface SeminarType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

export default function SeminarItem({
  seminars,
  setSeminarToEdit,
  setIsEditOpen,
  setSeminarToDelete,
  setIsDeleteOpen,
}: PropsWithChildren<SeminarProps>) {
  return (
    <div className="container">
      {seminars.length === 0 ? (
        <p className="no-seminars">Нет семинаров для отображения </p> // Сообщение, если массив пуст
      ) : (
        <ul className="seminar">
          {seminars.map((seminar: SeminarType) => (
            <li key={seminar.id}>
              <img src={seminar.photo} alt="фото" />
              <ul>
                <li className="seminar-title">{seminar.title}</li>
                <li className="seminar-description">
                  Описание: {seminar.description}
                </li>
                <li className="seminar-date">Дата: {seminar.date}</li>
                <li className="seminar-time">Время: {seminar.time}</li>
                <div className="btn-block">
                  <button
                    className="edit-btn"
                    type="button"
                    onClick={() => {
                      setSeminarToEdit(seminar.id);
                      setIsEditOpen(true);
                    }}
                  >
                    Редактировать
                  </button>
                  <button
                    className="del-btn"
                    type="button"
                    onClick={() => {
                      setSeminarToDelete(seminar.id);
                      setIsDeleteOpen(true);
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
