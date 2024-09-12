import React from "react";
import Navbar from "../Navbar";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children }) {
  return (
    <>
      <div className="min-h-lvh bg-offWhite">
        <div className="min-h-lvh w-full">
          <Navbar />
          <main className="w-[1266px] m-auto">{children}</main>
        </div>
        <ToastContainer limit={2} position="bottom-center" />
      </div>
    </>
  );
}

export default Layout;
