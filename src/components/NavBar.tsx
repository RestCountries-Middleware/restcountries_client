import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/authService";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      sessionStorage.clear();
      localStorage.clear();
      toast.success("Logout successful!");
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark px-5 py-3">
        <Link className="navbar-brand text-white me-5" to="/dashboard">
          <img src="src/assets/logo.png" height={30} alt="" />
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/apikeys"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                API Keys
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/apiexample"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                API Example
              </NavLink>
            </li>
            {userRole === "superadmin" ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/manageusers">
                  Manage Users
                </NavLink>
              </li>
            ) : null}
          </ul>
          <div className="d-flex align-items-center gap-3">
            {userEmail && (
              <span className="text-white small me-3">
                Logged in as: <strong>{userEmail}</strong>
              </span>
            )}
            <button
              className="btn px-3 py-1 btn-outline-danger"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
