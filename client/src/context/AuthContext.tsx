import React, { createContext, useEffect, useReducer, ReactNode, Dispatch } from "react";
import { AuthReducer, AuthState, AuthAction } from "./AuthReducer";

interface AuthContextProps {
  user: any | null;
  isFetching: boolean;
  error: boolean;
  dispatch: Dispatch<AuthAction>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const INITIAL_STATE: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isFetching: false,
  error: false,
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isFetching: false,
  error: false,
  dispatch: () => {},
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
