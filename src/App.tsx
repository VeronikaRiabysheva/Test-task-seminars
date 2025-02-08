import { useEffect, useState } from "react";
import ModalDelete from "./components/ModalDelete";
import ModalEdit from "./components/ModalEdit";
import SeminarItem from "./components/SeminarItem";
import Notifications from "./components/Notifications";

// добавить комментарии
function App() {
  const [seminars, setSeminars] = useState<[]>([]); // Создаем состояние для хранения семинаров
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false); // Состояние для хранения состояния модального окна удаления открыть/закрыть
  const [seminarToDelete, setSeminarToDelete] = useState<string | null>(null); // состояние для хранения id семинара
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false); // хранение состояния модального окна редактирования открыть/закрыть
  const [seminarToEdit, setSeminarToEdit] = useState<string | null>(null); //для хранения id семинара
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");
  const [deleteNotification, SetDeleteNotification] = useState<string>("");
  const [editValue, setEditValue] = useState<EditValueType>({
    title: "",
    description: "",
    date: "",
    time: "",
    photo: "",
  }); //для хранения значений, полученных с формы

  const [errors, setErrors] = useState<newErrorsType>({
    title: "",
    description: "",
    date: "",
    time: "",
    photo: "",
  }); //для хранения ошибок

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

  const validateForm = () => {
    const newErrors: newErrorsType = {};

    if (!editValue.title) {
      newErrors.title = "Название обязательно для заполнения.";
    } else if (editValue.title.length < 3) {
      newErrors.title = "Название должно содержать не менее 3 символов.";
    }
    if (!editValue.description) {
      newErrors.description = "Описание обязательно для заполнения.";
    } else if (editValue.description.length < 30) {
      newErrors.title = "Описание должно содержать не менее 30 символов.";
    }
    if (!editValue.date) {
      newErrors.date = "Дата обязательна для заполнения.";
    }
    if (!editValue.time) {
      newErrors.time = "Время обязательно для заполнения.";
    } else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(editValue.time)) {
      newErrors.time =
        "Время должно быть указано в формате ЧЧ:ММ (00:00 - 23:59)";
    }
    if (!editValue.photo) {
      newErrors.photo = "Фото обязательно для заполнения.";
    }
    return newErrors;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Если есть ошибки, не отправляем форму
    }

    if (seminarToEdit) {
      updateData(seminarToEdit); // Передаём id семинара
    }
    setIsEditOpen(false);
    setErrors({}); // Сбрасываем ошибки при успешной отправке
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const isEdited = () => {
    //уведомление об изменении семинара
    setNotification("Семинар успешно изменен!");
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const deleteOrder = () => {
    // уведомление об удалении семинара
    SetDeleteNotification(`Семинар удален!`);
    setTimeout(() => {
      SetDeleteNotification("");
    }, 3000);
  };
  const URL = "http://localhost:3001/seminars";

  const sendRequest = async () => {
    // запрос к серверу на получение данных
    setIsLoading(true);
    try {
      const response = await fetch(URL); // получаем ответ
      if (!response.ok) {
        throw new Error(
          "Возникла ошибка:" + response.status + response.statusText
        );
      }
      const data = await response.json(); // меняем на json формат
      setSeminars(data); // добавляем данные в состояние seminars для хранения
    } catch (error: any) {
      console.error("Возникла ошибка", error.message);
      alert(`Что-то пошло не так: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSeminar = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(
          "Возникла ошибка:" + response.status + response.statusText
        );
      }
      console.log("Семинар успешно удален!");
      deleteOrder(); // уведомление об удалении
      sendRequest(); // ререндеринг сайта с новыми (оставшимися) данными
    } catch (error: any) {
      console.error("Возникла ошибка", error.message);
      alert(`Что-то пошло не так: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValue), // Передаём текущее состояние editValue
      });

      if (!response.ok) {
        throw new Error(
          "Возникла ошибка: " + response.status + response.statusText
        );
      }
      console.log("Семинар успешно изменен!");
      isEdited(); // уведомление об изменении
      sendRequest(); // ререндеринг
    } catch (error: any) {
      console.error("Возникла ошибка", error.message);
      alert(`Что-то пошло не так: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsEditOpen(false); // Закрываем модальное окно
    setErrors({}); // Сбрасываем ошибки. Для того чтобы при следующем открытии окна для редактирования ошибки не отображались
  };

  return (
    <div>
      <SeminarItem
        seminars={seminars}
        setSeminarToEdit={setSeminarToEdit}
        setIsEditOpen={setIsEditOpen}
        setSeminarToDelete={setSeminarToDelete}
        setIsDeleteOpen={setIsDeleteOpen}
      />
      <div>
        <ModalDelete
          isDeleteOpen={isDeleteOpen} // открываем модальное окно
          deleteSeminar={deleteSeminar}
          seminarToDelete={seminarToDelete}
          setIsDeleteOpen={setIsDeleteOpen}
          onClose={() => setIsDeleteOpen(false)} // закрываем
        ></ModalDelete>

        <ModalEdit
          isEditOpen={isEditOpen}
          onClose={handleCloseModal}
          handleSubmit={handleSubmit}
          editValue={editValue}
          setEditValue={setEditValue}
          errors={errors}
        ></ModalEdit>
        {/* Уведомления об изменении или удалении семинара */}
        <Notifications
          notification={notification}
          deleteNotification={deleteNotification}
        />
        {isLoading ? <div className="loading">Загрузка...</div> : <span></span>}
      </div>
    </div>
  );
}

export default App;
