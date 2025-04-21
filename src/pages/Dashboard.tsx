// src/pages/Dashboard.tsx
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { useAuth } from "../utils/auth";
import { roles } from "../roles/roles";

interface Student {
  id: number;
  name: string;
  age: string;
  grade: string;
}

let idCounter = 1;

const Dashboard = () => {
  const { role } = useAuth();
  const permissions = roles[role];
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [form, setForm] = useState<Omit<Student, "id">>({
    name: "",
    age: "",
    grade: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [modalData, setModalData] = useState<Student | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.grade) return;
    if (editingId) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editingId ? { ...s, ...form } : s))
      );
    } else {
      setStudents((prev) => [...prev, { ...form, id: idCounter++ }]);
    }
    setForm({ name: "", age: "", grade: "" });
    setEditingId(null);
  };

  const handleEdit = (student: Student) => {
    setForm(student);
    setEditingId(student.id);
  };

  const handleDelete = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handlePrint = (student: Student) => {
    const content = `Name: ${student.name}\nAge: ${student.age}\nGrade: ${student.grade}`;
    alert("Print preview:\n" + content);
  };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Dashboard ({role.toUpperCase()})
      </h1>

      {permissions.canAdd && (
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Age"
            name="age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <Input
            label="Grade"
            name="grade"
            value={form.grade}
            onChange={(e) => setForm({ ...form, grade: e.target.value })}
          />
          <div className="col-span-3">
            <Button>{editingId ? "Update" : "Add"} Student</Button>
          </div>
        </form>
      )}

      {permissions.canView && (
        <Table
          students={students}
          onEdit={permissions.canEdit ? handleEdit : () => {}}
          onDelete={permissions.canDelete ? handleDelete : () => {}}
          onSelect={setSelectedIds}
          selectedIds={selectedIds}
        />
      )}

      {selectedIds.length > 0 && (
        <div className="mt-4">
          <Button
            variant="danger"
            onClick={() => {
              setStudents(students.filter((s) => !selectedIds.includes(s.id)));
              setSelectedIds([]);
            }}
          >
            Delete Selected
          </Button>
        </div>
      )}

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)}>
        {modalData && (
          <div>
            <h2 className="text-xl font-bold mb-2">Student Details</h2>
            <p>
              <strong>Name:</strong> {modalData.name}
            </p>
            <p>
              <strong>Age:</strong> {modalData.age}
            </p>
            <p>
              <strong>Grade:</strong> {modalData.grade}
            </p>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => handleEdit(modalData)}>Update</Button>
              <Button variant="success" onClick={() => handlePrint(modalData)}>
                Print
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
