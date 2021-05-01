import { createContext } from "react";
import { fetchGet } from "../scripts/fetchHelper";

export const NotificationContext = createContext({
  notifications: null,
  setNotifications: () => {},
  getNotifications: async (aliasId) => {
    let notifications;
    await fetchGet(
      `${process.env.REACT_APP_BASE_URL}/api/orders/new/${aliasId}`,
      (res) => {
        notifications = res.length;
      }
    );
    return notifications || null;
  },
});
