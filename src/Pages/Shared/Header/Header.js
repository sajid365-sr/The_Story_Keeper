import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/logo.png";
import { UserContext } from "../../../Contexts/AuthContext/AuthContext";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  const { user, logOUt } = useContext(UserContext);

  const navItem = (
    <>
      <Link
        className="lg:hover:border-b-2 hover:bg-zinc-300 px-3 lg:px-0 text-secondary mb-5 font-medium border-gray-800"
        to="/home"
      >
        Home
      </Link>
      <Link
        className="lg:hover:border-b-2 hover:bg-zinc-300 px-3 lg:px-0 text-secondary mb-5 font-medium border-gray-800"
        to="/shop"
      >
        Shop
      </Link>
      <Link
        className="lg:hover:border-b-2 hover:bg-zinc-300 px-3 lg:px-0 text-secondary mb-5 font-medium border-gray-800"
        to="/blog"
      >
        Blog
      </Link>
      <Link
        className="lg:hover:border-b-2 hover:bg-zinc-300 px-3 lg:px-0 text-secondary mb-5 font-medium border-gray-800"
        to="/dashboard"
      >
        Dashboard
      </Link>
    </>
  );

  // Logout user
  const handleLogOut = () => {
    logOUt()
      .then(() => {})
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start lg:w-1/2 w-full">
          <div className="dropdown">
            <label tabIndex={0} className="btn  btn-primary bg-opacity-30 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-secondary "
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
          <Link className="flex items-center" to="/">
            <img className="w-[60px]" src={logo} alt="" />
            <p className="text-xl font-Kaushan text-secondary font-semibold">
              The Story Keeper
            </p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu gap-10 menu-horizontal p-0">{navItem}</ul>
        </div>
        <div className="navbar-end">
        {
            user?
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL ? user.photoURL : <FaUserAlt/>} alt='user profile' />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content lg:-mr-10 px-5 py-6 shadow bg-secondary  rounded-box w-56"
              >
                <li className="text-gray-300">
                  <p className="cursor-default">{user.email}</p>
                  <p className="cursor-default">{user.displayName}</p>
                </li>
                <li role='button' className="text-gray-300">
                <p>Settings</p>
                </li>
                <li role='button' onClick={handleLogOut}>
                  <p>Logout</p>
                </li>
              </ul>
            </div>
            :
            <>
            <Link className="mr-4" to="/login">
              <button className="btn btn-info px-5 text-base text-gray-700">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-info px-5 text-base text-gray-700">
                SignUp
              </button>
            </Link>
            </>

        }
        </div>
      </div>
    </div>
  );
};

export default Header;
