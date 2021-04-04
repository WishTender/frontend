import { createContext } from "react";
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  getUser: async () => {
    let user = await fetch("http://localhost:4000/api/k", {
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
