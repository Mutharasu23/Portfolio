import { useNavigate } from "react-router-dom";

const Home = ({ setIsAuth }) => {

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
    <section id="home" className="section">

      <button onClick={logout}>Logout</button>

      <h1>Hello, I'm Mutharasu</h1>
      <p>React Developer | Full Stack Learner</p>

    </section>
  );
};

export default Home;
