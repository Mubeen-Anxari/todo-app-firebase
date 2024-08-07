// components/Navbar.js
import Link from "next/link";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-10 px-20 h-10 ">
      <div className="">
        <h1 className="">Navbar</h1>
      </div>
      <NavLink className="text-blue-800 underline" to="/create">
        Add
      </NavLink>
      <NavLink className="text-blue-800 underline" to="/">
        Read
      </NavLink>
    </nav>
  );
};

export default Navbar;
