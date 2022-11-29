import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/logo.png";

const Header = () => {
  const navItem = (
    <>
      <Link className="hover:border-b-2 text-secondary font-medium border-gray-800" to='/home'>Home</Link>
      <Link className="hover:border-b-2 text-secondary font-medium border-gray-800" to='/shop'>Shop</Link>
      <Link className="hover:border-b-2 text-secondary font-medium border-gray-800" to='/blog'>Blog</Link>
      <Link className="hover:border-b-2 text-secondary font-medium border-gray-800" to='/dashboard'>Dashboard</Link>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItem}
            </ul>
          </div>
          <Link className="flex items-center" to='/'>
            <img className="w-[60px]" src={logo} alt="" />
            <p className="text-xl font-Kaushan text-secondary font-semibold">The Story Keeper</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu gap-10 menu-horizontal p-0">
            {navItem}
          </ul>
        </div>
        <div className="navbar-end">
          <Link to='/login'>
          <button className="btn btn-info px-5 text-base text-gray-700">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
