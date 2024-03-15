import { createContext, useState } from "react";

export const mainContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentClass, _setCurrentClass] = useState(null);
  const setCurrentClass = (val) => {
    _setCurrentClass(val);
  };

  const [currentUser, _setCurrentUser] = useState(null);
  const setCurrentUser = (val) => {
    _setCurrentUser(val);
  };

  const value = {
    currentClass,
    setCurrentClass,
    currentUser,
    setCurrentUser,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
};
