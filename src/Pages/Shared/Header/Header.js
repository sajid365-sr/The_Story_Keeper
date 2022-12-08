import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/logo.png";
import { UserContext } from "../../../Contexts/AuthContext/AuthContext";
import { FaUserAlt } from "react-icons/fa";
import UseGetAdvertiseItem from "../../../Hooks/UseGetAdvertiseItem";


const Header = () => {
  const { user, logOUt } = useContext(UserContext);
  const [viewProfile, setViewProfile] = useState(false);
  const [viewNav, setViewNav] = useState(false);
  const [items, refetch] = UseGetAdvertiseItem();

  refetch();
  const navStyle =
    "lg:hover:border-b-2 hover:bg-zinc-300 lg:hover:bg-white px-3 lg:px-0 text-[#291334] lg:mb-0 mb-5 font-medium border-gray-800";

  const navItem = (
    <>
      <Link
        className={` ${navStyle} ${
          viewNav
            ? "translate-x-0 transition-transform duration-1000"
            : "translate-x-[80%]"
        }`}
        to="/home"
      >
        Home
      </Link>
      <Link
        className={`${navStyle} ${
          viewNav
            ? "translate-x-0 transition-transform duration-1000"
            : "translate-x-[75%]"
        }`}
        to="/shop"
      >
        Shop
      </Link>
      {
        items.length >= 1 &&
        <Link
        className={`${navStyle} ${
          viewNav
            ? "translate-x-0 transition-transform duration-1000"
            : "translate-x-[70%]"
        }`}
        to="/advertise"
      >
        Advertise Items
      </Link>
      }
      <Link
        className={`${navStyle} ${
          viewNav
            ? "translate-x-0 transition-transform duration-1000"
            : "translate-x-[65%]"
        }`}
        to="/blog"
      >
        Blog
      </Link>
      {user && (
        <Link
          className={`${navStyle} ${
            viewNav
              ? "translate-x-0 transition-transform duration-1000"
              : "translate-x-[60%]"
          }`}
          to="/dashboard"
        >
          Dashboard
        </Link>
      )}
    </>
  );

  // Logout user
  const handleLogOut = () => {
    logOUt()
      .then(() => {})
      .catch((e) => console.error(e));
  };

  return (
    <section className="lg:max-w-screen-xl w-11/12 my-4 mx-auto">
      <div className="flex items-center bg-base-100">
        <div className="lg:w-[20%] flex w-2/3">
        
          <div className="dropdown"
           onBlur={() => setViewNav(false)}
          >
            <label
             onClick={() => setViewNav(true)}
              tabIndex={0}
              className="btn  btn-info hover:text-gray-100 bg-opacity-30 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5  "
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-64"
            >
              {navItem}
              <div className="flex mb-3 ml-2  gap-3">
                <Link to="/login">
                  <button className="btn px-5 text-base text-gray-300 bg-gray-900 btn-sm rounded-sm hover:text-white">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn px-5 text-base text-gray-300 bg-gray-900 btn-sm rounded-sm hover:text-white">
                    SignUp
                  </button>
                </Link>
              </div>
            </ul>
          </div>
          <Link className="flex items-center" to="/">
            <img className="w-[50px]" src={logo} alt="" />
            <p className="text-xl font-Kaushan text-[#291334] font-semibold">
              The Story Keeper
            </p>
          </Link>
        </div>
        
        <div className="w-[60%] hidden lg:block">
          <ul className="flex w-full justify-around">{navItem}</ul>
        </div>
        <div className="lg:w-[20%] w-1/3 flex justify-end">
          {user ? (
            <div className="dropdown dropdown-left">
              <label
                onFocus={() => setViewProfile(true)}
                onBlur={() => setViewProfile(false)}
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar online"
              >
                <div className="w-8 rounded-full ring ring-[#291334] ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL ? user.photoURL : <FaUserAlt />}
                    alt="user profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu absolute menu-compact dropdown-content px-5 py-6 shadow bg-[#291334]  rounded-box w-56"
              >
                <li
                  className={`text-gray-300 relative ${
                    viewProfile
                      ? "translate-x-0 transition-all duration-1000"
                      : "translate-x-[100%]"
                  }`}
                >
                  <p className="cursor-default">{user.email}</p>
                  <p className="cursor-default">{user.displayName}</p>
                </li>
                <li
                  role="button"
                  className={`text-gray-300 ${
                    viewProfile
                      ? "translate-x-0 transition-all duration-1000"
                      : "translate-x-[70%]"
                  }`}
                >
                  <p>Settings</p>
                </li>
                <li
                  className={
                    viewProfile
                      ? "translate-x-0 transition-all duration-1000"
                      : "translate-x-[50%]"
                  }
                  role="button"
                  onClick={handleLogOut}
                >
                  <p className="text-gray-300">Logout</p>
                </li>
              </ul>
            </div>
          ) : (
            <div className="gap-3 hidden lg:flex">
              <Link to="/login">
                <button className="btn px-5 text-base text-gray-300 bg-gray-900 btn-sm rounded-sm hover:text-white">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn px-5 text-base text-gray-300 bg-gray-900 btn-sm rounded-sm hover:text-white">
                  SignUp
                </button>
              </Link>
            </div>
          )}

          {/* Dashboard toggle button */}
          {
            user &&
            <label
            htmlFor="dashboard-drawer"
            tabIndex={2}
            className="btn btn-ghost lg:hidden"
          >
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
          }
        </div>
      </div>
    </section>
  );
};

export default Header;
