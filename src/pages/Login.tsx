import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { authService } from "../services/authService";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authService.login(email, password);

      if (!res.user?.id) {
        throw new Error('Invalid response from server.');
      }

      sessionStorage.setItem('jwtToken', res.jwtToken);
      sessionStorage.setItem('csrfToken', res.csrfToken);
      localStorage.setItem('userId', res.user.id);
      localStorage.setItem('userEmail', res.user.email);
      localStorage.setItem('userRole', res.user.role);

      login();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <>
      <div className="auth-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn custom-btn w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link className="text-decoration-none" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
