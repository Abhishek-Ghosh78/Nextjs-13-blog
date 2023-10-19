import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

type AuthState = {
  user: User | null;
};

// user initial state
const initialState: AuthState = {
  user: null,
};

type AuthContextType = {
  state: AuthState;
  dispach: React.Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispach] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user: User = JSON.parse(userString);
      dispach({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispach }}>
      {children}
    </AuthContext.Provider>
  );
};

const UserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("User must be inside UserContext");
  }
  //   console.log(context);
  return context;
};

export { UserContext, AuthContextProvider };
