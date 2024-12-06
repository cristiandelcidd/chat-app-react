import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";

import { auth } from "../firebase";
import { Spinner } from "../components";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = () => {};

  const logout = () => {
    auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
