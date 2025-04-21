import React, { useState } from "react";
import { Student, useStudentContext } from "../context/StudentContext";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Function to generate a unique ID without external packages
const generateUniqueId = () => {
  return `student-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const AdminPage = () => {
  const {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    selectedIds,
    setSelectedIds,
  } = useStudentContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Omit<Student, "id">>({
    name: "",
    email: "",
    age: 0,
    course: "",
    address: "",
  });

  const { logout } = useAuth(); // Now we can use logout
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to Dashboard after logout
  };

  const openCreateModal = () => {
    setEditing(null);
    setFormData({ name: "", email: "", age: 0, course: "", address: "" });
    setModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setEditing(student);
    setFormData({
      name: student.name,
      email: student.email,
      age: student.age,
      course: student.course,
      address: student.address,
    });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (editing) {
      updateStudent({ id: editing.id, ...formData });
    } else {
      addStudent({ id: generateUniqueId(), ...formData }); // Use the unique ID generator here
    }
    setModalOpen(false);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIds(e.target.checked ? students.map((s) => s.id) : []);
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Manage Students</h1>

      <div className="flex justify-between p-2  my-5 ">
        <Button
          onClick={openCreateModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-teal-500 shadow-xl"
        >
          Add New
        </Button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 shadow-xl"
        >
          Logout
        </button>
      </div>

      <table className="w-full border text-sm rounded-xl shadow-xl">
        <thead>
          <tr className="bg-green-300">
            <th className="p-2 text-left">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedIds.length === students.length}
              />
            </th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center py-4 flex justify-center w-full"
              >
                No data available. Add new one.
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <React.Fragment key={s.id}>
                <tr className="border-t">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(s.id)}
                      onChange={() => handleSelect(s.id)}
                    />
                  </td>
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.email}</td>
                  <td className="p-2">
                    <Button variant="primary" onClick={() => openEditModal(s)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => deleteStudent(s.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr className="text-sm text-gray-600 bg-gray-50">
                  <td colSpan={4} className="px-6 pb-2 pt-0">
                    <strong>Age:</strong> {s.age} | <strong>Course:</strong>{" "}
                    {s.course} | <strong>Address:</strong> {s.address}
                  </td>
                </tr>
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Student" : "Add Student"}
      >
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Age"
          type="number"
          value={formData.age}
          onChange={(e) =>
            setFormData({ ...formData, age: Number(e.target.value) })
          }
        />
        <Input
          label="Course"
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
        />
        <Input
          label="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />

        <div className="mt-4">
          <Button onClick={handleSubmit}>{editing ? "Update" : "Add"}</Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminPage;
