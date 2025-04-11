"use client";

import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

interface Notification {
  title: string;
  description: string;
  date: string;
  userId: User;
}
const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await axios.get("/api/notifications");
      setNotifications(res.data);
    };
    fetchNotifications();
  }, []);
  return (
    <>
      <h1 className="uppercase text-center font-semibold text-3xl">
        Notification Page
      </h1>
      <div className="overflow-x-auto mt-6 bg-base-200 rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length !== 0 ? (
              notifications.map((notification, index) => (
                <tr key={index} className="hover">
                  <td>{notification.title}</td>
                  <td>{notification.description}</td>
                  <td>{notification.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  No notifications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NotificationPage;
