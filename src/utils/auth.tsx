import React, { createContext, useContext, useState } from "react";

type Role = "admin" | "student";

interface AuthContextProps {
  role: Role;
  setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRoleState] = useState<Role>(() => {
    return (localStorage.getItem("role") as Role) || "student";
  });

  const setRole = (newRole: Role) => {
    localStorage.setItem("role", newRole);
    setRoleState(newRole);
  };

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
