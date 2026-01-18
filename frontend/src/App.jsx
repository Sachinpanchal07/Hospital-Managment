import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Appointment from "./pages/Appointment.jsx";
import About from "./pages/AboutUs.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { Context } from "./main.jsx";
import axios from "axios";
import Footer from "./components/Footer.jsx";

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get("http://localhost:4000/api/v1/user/patient/me", {
          withCredentials: true,
        })
        .then((res) => {
          setIsAuthenticated(true);
          setUser(res.data.user);
          // console.log(res);
        })
        .catch((error) => {
          setIsAuthenticated(false);
          setUser({});
        });
    };

    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}>
            {" "}
          </Route>
          <Route
            path="/appointment"
            element={<Appointment></Appointment>}
          ></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
      <ToastContainer position="top-center"></ToastContainer>
    </>
  );
}

export default App;
