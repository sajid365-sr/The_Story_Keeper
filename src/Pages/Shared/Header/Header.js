import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/logo.png";
import { UserContext } from "../../../Contexts/AuthContext/AuthContext";
import { FaUserAlt, FaCloudUploadAlt } from "react-icons/fa";
import UseGetAdvertiseItem from "../../../Hooks/UseGetAdvertiseItem";

const Header = () => {
  const { user, logOUt, updateUser } = useContext(UserContext);
  const [items, refetch] = UseGetAdvertiseItem();
  const [viewModal, setViewModal] = useState(true);
  const ImageHostKey = process.env.REACT_APP_imgUploadKey;

  refetch();

  const navStyle =
    "lg:hover:border-b-2 hover:bg-zinc-300 lg:hover:bg-white px-3 lg:px-0 text-[#291334] lg:mb-0 mb-5 font-medium border-gray-800";

  const navItem = (
    <>
      <Link className={`${navStyle}`} to="/home">
        Home
      </Link>
      <Link className={`${navStyle} `} to="/shop">
        Shop
      </Link>
      {items.length >= 1 && (
        <Link className={`${navStyle} `} to="/advertise">
          Advertise Items
        </Link>
      )}
      <Link className={`${navStyle} `} to="/blog">
        Blog
      </Link>
      {user && (
        <Link className={`${navStyle} `} to="/dashboard">
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

  const handleModalSubmit = (event) => {
    event.preventDefault();

    const photo = event.target.uploadPhoto.files[0];
    const formData = new FormData();
    formData.append("image", photo);

    fetch(`https://api.imgbb.com/1/upload?key=${ImageHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const userPhoto = {
            photoURL:imgData.data.url
          };
          updateUser(userPhoto)
            .then(() => {
              setViewModal(false);
            })
            .catch((e) => console.error(e));
        }
      });
  };

  return (
    <section className="lg:max-w-screen-xl w-11/12 my-4 mx-auto">
      <div className="flex items-center bg-base-100">
        <div className="lg:w-[20%] flex w-2/3">
          <div className="dropdown">
            <label
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
              {!user && (
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
              )}
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
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar online"
              >
                <div className="w-8 rounded-full ring ring-[#291334] ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL == null ? <FaUserAlt /> : user.photoURL}
                    alt="user profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu absolute menu-compact dropdown-content px-5 py-6 shadow bg-[#291334]  rounded-box w-56"
              >
                <li className="text-gray-300 relative">
                  <p className="cursor-default">{user.email}</p>
                  <p className="cursor-default">{user.displayName}</p>
                </li>
                <li role="button" className="text-gray-300">
                  <label
                    onClick={() => setViewModal(true)}
                    htmlFor="UpdatePhoto"
                  >
                    Upload Photo
                  </label>
                </li>
                <li role="button" onClick={handleLogOut}>
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
          {user && (
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
          )}
        </div>
      </div>

      {/* Modal for user photo update */}

      {viewModal && (
        <>
          <input type="checkbox" id="UpdatePhoto" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold mb-5 text-xl">Upload your photo</h3>
              <form action="" onSubmit={handleModalSubmit}>
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointe  hover:bg-zinc-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaCloudUploadAlt className="text-4xl" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">
                        Click to upload your photo
                      </span>
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="uploadPhoto"
                  />
                </label>
                <div className="modal-action">
                  <button
                    onClick={() => setViewModal(false)}
                    className="btn rounded-none text-gray-300 hover:bg-gray-800 btn-sm hover:text-white w-40"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn rounded-none text-gray-300 hover:bg-gray-800 btn-sm hover:text-white w-40"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Header;
