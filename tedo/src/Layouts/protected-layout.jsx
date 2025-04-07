import React from "react";
import { Route, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useModal } from "../hooks/useModal";

function ProtectedLayout() {


  return (
    <div>
      <main>
        <Navbar/>
        <div className="m-4">
        <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ProtectedLayout;
