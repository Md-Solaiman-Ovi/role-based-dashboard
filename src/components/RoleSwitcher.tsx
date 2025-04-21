import { useAuth } from "../utils/auth";

const RoleSwitcher = () => {
  const { role, setRole } = useAuth();

  return (
    <div className="p-4 bg-white shadow rounded w-fit mx-auto mb-4">
      <label className="font-medium mr-2">Switch Role:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "admin" | "student")}
        className="px-3 py-1 border rounded"
      >
        <option value="admin">Admin</option>
        <option value="student">Student</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;
