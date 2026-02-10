import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsAuth }) => {

  const navigate = useNavigate();

  const logout = () => {

    // Remove token
    localStorage.removeItem("token");

    // Update state
    setIsAuth(false);

    // Redirect
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">

      <h2>MyPortfolio</h2>

      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

    </nav>
  );
};

export default Navbar;
