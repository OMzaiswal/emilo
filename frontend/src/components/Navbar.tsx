import React from "react";
import { Bell } from "lucide-react";
// import { useRecoilValue } from "recoil";
// import { loginState } from "../recoil/loginState";

export const Navbar: React.FC = () => {

    // const user = useRecoilValue(loginState);

  return (
    <nav className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-indigo-600">App</div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-700" />
        </button>

        <img
          src=''
          alt="Profile"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </nav>
  );
};
