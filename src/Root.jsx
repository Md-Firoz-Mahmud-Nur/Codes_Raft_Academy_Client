import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import SignModal from "./Pages/Login/SignModal";

const Root = () => {
  const {user, isModalOpen } = useContext(AuthContext);

  return (
    <div>
      <Navbar></Navbar>
      {isModalOpen && user === null && <SignModal></SignModal>}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
