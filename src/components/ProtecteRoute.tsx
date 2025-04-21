import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: Props) => {
  const { role } = useAuth();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
