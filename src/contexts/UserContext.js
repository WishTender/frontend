import { createContext } from "react";
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  getUser: async () => {
    let user = await fetch(
      process.env.REACT_APP_BASE_URL + "/api/users/current",
      {
        credentials: "include",
      }
    ).then(async (res) => {
      if (res.status === 204) return Promise.resolve(null);
      const user = await res.json();
      return user;
    });
    return user || null;
  },
});
