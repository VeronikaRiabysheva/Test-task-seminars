import "./Notifications.css";

interface NotificationsPtops {
  notification: string;
  deleteNotification: string;
}

export default function Notifications({
  notification,
  deleteNotification,
}: NotificationsPtops) {
  return (
    <div>
      {notification && <div className="notification">{notification}</div>}
      {deleteNotification && (
        <div className="notification-del">{deleteNotification}</div>
      )}
    </div>
  );
}
