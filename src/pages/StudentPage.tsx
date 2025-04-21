// src/pages/StudentPage.tsx
import React from "react";
import { useStudentContext } from "../context/StudentContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StudentPage = () => {
  const { students } = useStudentContext();

  const { logout } = useAuth(); // Now we can use logout
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to Dashboard after logout
  };
  return (
    <div className="p-6 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">
          Student Panel - View Your Details
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-green-300">
            <th className="p-2 text-center border-r">Serial no.</th>
            <th className="p-2 text-center border-r">Name</th>
            <th className="p-2 text-center border-r">Email</th>
            <th className="p-2 text-center border-r">Age</th>
            <th className="p-2 text-center border-r">Course</th>
            <th className="p-2 text-center border-r">Address</th>
            <th className="p-2 text-center border-r">Details</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, index: number) => (
            <React.Fragment key={s.id}>
              <tr className="border-t">
                <td className="p-2 text-center w-20 border-r">{index + 1}</td>
                <td className="p-2 text-center border-r">{s.name}</td>
                <td className="p-2 text-center border-r">{s.email}</td>
                <td className="p-2 text-center border-r">{s.age}</td>
                <td className="p-2 text-center border-r">{s.course}</td>
                <td className="p-2 text-center border-r">{s.address}</td>
                <td className="p-2 text-center border-r">
                  <Button variant="outline" disabled>
                    View Details
                  </Button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPage;
