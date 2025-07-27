import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);

  const signinHandler = async () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Username and password are required.");
      return;
    }
    setLoading(true);

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        // Optional: Save user info to localStorage or context
        console.log("Login successful", userData);
        localStorage.setItem("userData", JSON.stringify(userData));

        userContext?.setUserData(userData);
        navigate("/profile", {
          state: {
            userData,
          },
        });
      } else {
        alert("No user found. Please register.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Try again later.");
    }
    setLoading(false);
    setUsername("");
    setPassword("");
  };

  const cancelHandler = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container m-5 d-flex justify-content-center align-items-center">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-4">Login</h1>
          <div className="card p-4 shadow-sm">
            <label className="form-label mt-3 fw-bold">Username:</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="form-label mt-3 fw-bold">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex gap-2 mt-4">
              <button className="btn btn-primary" onClick={signinHandler}>
                Sign in
              </button>
              <button className="btn btn-secondary" onClick={cancelHandler}>
                Cancel
              </button>
            </div>
            <div>
              <Link to="/register">Create New User</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
