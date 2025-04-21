// src/components/Table.tsx
import React, { useState } from "react";

type Student = {
  id: number;
  name: string;
  age: string;
  grade: string;
};

type TableProps = {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onSelect: (ids: number[]) => void;
  selectedIds: number[];
};

const Table = ({
  students,
  onEdit,
  onDelete,
  onSelect,
  selectedIds,
}: TableProps) => {
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    onSelect(!selectAll ? students.map((s) => s.id) : []);
  };

  const toggleSelect = (id: number) => {
    onSelect(
      selectedIds.includes(id)
        ? selectedIds.filter((sid) => sid !== id)
        : [...selectedIds, id]
    );
  };

  return (
    <table className="w-full border mt-6 ">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
          </th>
          <th className="p-2">Name</th>
          <th className="p-2">Age</th>
          <th className="p-2">Grade</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id} className="border-t hover:bg-gray-50">
            <td className="p-2">
              <input
                type="checkbox"
                checked={selectedIds.includes(student.id)}
                onChange={() => toggleSelect(student.id)}
              />
            </td>
            <td className="p-2">{student.name}</td>
            <td className="p-2">{student.age}</td>
            <td className="p-2">{student.grade}</td>
            <td className="p-2">
              <button
                onClick={() => onEdit(student)}
                className="text-blue-600 hover:underline mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(student.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
