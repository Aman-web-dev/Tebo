import React from "react";
import {Outlet } from "react-router-dom";
import Navbar from "../components/navbar";


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
