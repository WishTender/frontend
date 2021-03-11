import { createContext } from "react";

export const RouteContext = createContext({
  isCurrentUsersProfile: null,
  setIsCurrentUsersProfile: () => {},
  allRoutes: null,
});
