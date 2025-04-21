import React, { createContext, useState, useContext, ReactNode } from "react";

export type Student = {
  id: string;
  name: string;
  email: string;
  age: number;
  course: string;
  address: string;
};

interface StudentContextType {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudentContext = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentContext must be used within a StudentProvider");
  }
  return context;
};

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const addStudent = (student: Student) => {
    setStudents((prevStudents) => [...prevStudents, student]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        selectedIds,
        setSelectedIds,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
