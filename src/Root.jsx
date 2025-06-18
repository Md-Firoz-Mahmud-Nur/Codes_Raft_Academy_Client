import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import SignModal from "./Pages/Login/SignModal";
import EnrollModal from "./Components/EnrollModal";
import { Toaster } from "react-hot-toast";

const Root = () => {
  const { user, isModalOpen } = useContext(AuthContext);


  return (
    <div>
      <Navbar></Navbar>
      {isModalOpen && user === null && <SignModal></SignModal>}
      <EnrollModal></EnrollModal>
      <Outlet></Outlet>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default Root;
