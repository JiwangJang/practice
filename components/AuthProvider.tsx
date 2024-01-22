"use client";

import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

const AuthContext = createContext({
  isAuthorized: false,
  setIsAuthorized: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

const AuthProvider = ({
  isAuthorized,
  setIsAuthorized,
  children,
}: {
  isAuthorized: boolean;
  setIsAuthorized: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) => {
  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
