import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Skills from "./Pages/Skills";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";

import "./styles/App.css";

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check login on refresh
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }

    setLoading(false);

  }, []);

  // Prevent white screen
  if (loading) {
    return <div style={{ color: "white", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <Routes>

      {/* Login Page */}
      <Route
        path="/login"
        element={
          isAuth
            ? <Navigate to="/" replace />
            : <Login setIsAuth={setIsAuth} />
        }
      />

      {/* Protected Page */}
      <Route
        path="/"
        element={
          isAuth ? (
            <>
              <Navbar setIsAuth={setIsAuth} />

              <Home setIsAuth={setIsAuth} />
              <About />
              <Skills />
              <Projects />
              <Contact />
              <Footer />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

    </Routes>
  );
}

export default App;
