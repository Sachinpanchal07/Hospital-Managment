import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/DashBoard.jsx";
import Login from "./components/Login.jsx";
import AddNewDoctor from "./components/AddNewDoctor.jsx";
import Messages from "./components/Messages.jsx";
import Doctors from "./components/Doctors.jsx";
import Sidebar from "./components/Sidebar.jsx";
import AddNewAdmin from "./components/AddNewAdmin.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Context } from "./main.jsx";
import "./App.css";

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get("http://localhost:4000/api/v1/user/admin/me", {
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
        <Sidebar />
        <Routes>
          <Route path={"/"} element={<Dashboard></Dashboard>}></Route>
          <Route path={"/login"} element={<Login></Login>}></Route>
          <Route
            path={"/doctor/addnew"}
            element={<AddNewDoctor></AddNewDoctor>}
          ></Route>
          <Route
            path={"/admin/addnew"}
            element={<AddNewAdmin></AddNewAdmin>}
          ></Route>
          <Route path={"messages"} element={<Messages></Messages>}></Route>
          <Route path={"/doctors"} element={<Doctors></Doctors>}></Route>
        </Routes>
      </Router>
      <ToastContainer position="top-center"></ToastContainer>
    </>
  );
}

export default App;
