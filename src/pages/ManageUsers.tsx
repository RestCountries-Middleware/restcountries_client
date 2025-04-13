import { toast } from "react-toastify";
import Navbar from "../components/NavBar";
import { useEffect, useState } from "react";
import { UserDto } from "../dtos/UserDto";
import { userService } from "../services/userService";

const ManageUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      const data = await userService.getAllUsers(userId);
      setUsers(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load users");
    }
  };

  const handleStatusChange = async (userId: string, isActive: boolean) => {
    const confirm = window.confirm(
      `Are you sure you want to ${
        isActive ? "deactivate" : "activate"
      } this user?`
    );
    if (!confirm) return;

    try {
      if (isActive) {
        await userService.deactivateUser(userId);
        toast.info("User deactivated");
      } else {
        await userService.activateUser(userId);
        toast.success("User activated");
      }
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to update user");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">Manage Users</h2>
        <div className="d-flex px-5 py-4">
          <table className="table ">
            <thead>
              <tr>
                <th style={{ minWidth: "20rem" }}>Email</th>
                <th style={{ minWidth: "8rem" }}>Role</th>
                <th style={{ minWidth: "8rem" }}>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="text-muted">{user.email}</td>
                  <td className="text-muted">{user.role}</td>
                  <td className="text-muted">
                    {user.is_active ? "Active" : "Inactive"}
                  </td>
                  <td className="d-flex justify-content-end">
                    <button
                      className={`btn btn-${
                        user.is_active ? "danger" : "success"
                      } btn-sm`}
                      onClick={() =>
                        handleStatusChange(user.id, user.is_active)
                      }
                    >
                      {user.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageUsersPage;
