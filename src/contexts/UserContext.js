import { createContext } from "react";
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  getUser: async () => {
    let user = await fetch("/api/users/current", {
      credentials: "include",
    }).then(async (res) => {
      console.log(res);
      if (res.status === 204) return Promise.resolve(null);
      const p = await res.json();
      console.log("json", p);
    });
    return user || null;
  },
});
