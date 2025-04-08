import React from "react";
import { useModal } from "../hooks/useModal";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { logout, user } = useAuth();
  const { createProject } = useModal();
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Tedo
          </span>
        </a>
        <div className="flex md:order-2  gap-3 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user?.designation == "Admin" && (
            <button
              onClick={createProject}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Project
            </button>
          )}

          <button
            onClick={logout}
            type="button"
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center   dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Logout
          </button>
        </div>

        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;
