import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the AuthContextProps type with `logout` function
interface AuthContextProps {
  role: "admin" | "student";
  setRole: (role: "admin" | "student") => void;
  logout: () => void; // Add logout function here
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [role, setRole] = useState<"admin" | "student">("student");

  // Add logout functionality to clear the role or other auth-related data
  const logout = () => {
    setRole("student"); // You can also remove user data from local storage/sessionStorage if needed
    localStorage.removeItem("user"); // If you're storing the user in local storage
  };

  return (
    <AuthContext.Provider value={{ role, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
