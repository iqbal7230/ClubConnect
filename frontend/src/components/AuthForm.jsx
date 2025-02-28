import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "login") {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password, formData.role);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-bold text-white">
          {type === "login" ? "Sign in to your account" : "Create a new account"}
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {type === "register" && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-primary"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-primary"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-primary"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {type === "register" && (
            <div>
              <select
                className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-primary"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="admin">Club Admin</option>
                <option value="sponsor">Sponsor</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-primary hover:bg-primary-dark rounded-md transition-all duration-300"
          >
            {type === "login" ? "Sign in" : "Register"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 mt-4">
          {type === "login" ? (
            <Link to="/register" className="text-primary hover:underline">
              Don't have an account? Register
            </Link>
          ) : (
            <Link to="/login" className="text-primary hover:underline">
              Already have an account? Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
