import React from 'react';

const Notification = ({ notifications, clearNotifications }) => {
  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div key={index} className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      ))}
      <button onClick={clearNotifications}>Clear Notifications</button>
    </div>
  );
};

export default Notification;
