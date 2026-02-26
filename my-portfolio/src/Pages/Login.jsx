import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsAuth }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();

  const API = `${process.env.REACT_APP_BACKEND_URI}/api/auth`;

  // Auto redirect
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  /* ================= SIGNUP ================= */
  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(`${API}/register`, {
        email,
        password
      });

      alert(res.data.msg);

      setIsSignup(false);
      setEmail("");
      setPassword("");

    } catch (err) {

      alert(err.response?.data?.msg || "Signup failed");

    }
  };

  /* ================= LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(`${API}/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      setIsAuth(true);
      navigate("/");

    } catch (err) {

      alert(err.response?.data?.msg || "Login failed");

    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        <form onSubmit={isSignup ? handleSignup : handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>

        </form>

        <p className="toggle-text">

          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <span onClick={() => setIsSignup(!isSignup)}>

            {isSignup ? " Login" : " Sign Up"}

          </span>

        </p>

      </div>
    </div>
  );
}

export default Login;
