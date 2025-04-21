// src/utils/auth.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { roles } from "../roles/roles"; // ✅ Add this import

type AuthContextType = {
  role: keyof typeof roles;
  setRole: (role: keyof typeof roles) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<keyof typeof roles>("admin");

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
