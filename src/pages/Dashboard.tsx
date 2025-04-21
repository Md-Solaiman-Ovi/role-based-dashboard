// src/pages/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

const RoleSwitcher = () => {
  const { role, setRole } = useAuth();

  return (
    <div className="mb-6">
      <label className="font-semibold mr-2">Switch Role:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "admin" | "student")}
        className="border px-3 py-1 rounded shadow"
      >
        <option value="admin">Admin</option>
        <option value="student">Student</option>
      </select>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleRedirect = () => {
    if (role === "admin") navigate("/admin");
    else if (role === "student") navigate("/student");
    else navigate("/unauthorized");
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      <RoleSwitcher />
      <button
        onClick={handleRedirect}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to {role} Page
      </button>
    </div>
  );
};

export default Dashboard;
