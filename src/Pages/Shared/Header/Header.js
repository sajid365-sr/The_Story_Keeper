import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/logo.png";
import { UserContext } from "../../../Contexts/AuthContext/AuthContext";
import { FaUserAlt, FaCloudUploadAlt, FaBars } from "react-icons/fa";
import UseGetAdvertiseItem from "../../../Hooks/UseGetAdvertiseItem";


const Header = () => {
  const { user, logOut, updateUser } = useContext(UserContext);
  const [items, refetch] = UseGetAdvertiseItem();
  const [viewModal, setViewModal] = useState(true);
  const ImageHostKey = process.env.REACT_APP_imgUploadKey;
  const [uploadImg, setUploadImg] = useState(false);
  

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
    logOut()
      .then(() => {})
      .catch((e) => console.error(e));
  };

  const handleModalSubmit = (event) => {
    event.preventDefault();
    setUploadImg(true);

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
              setUploadImg(false);
            })
            .catch((e) => console.error(e));
        }
      });
  };
  refetch();

  return (
    <section className="lg:max-w-screen-xl w-11/12 my-4 mx-auto">
      <div className="flex items-center bg-base-100">
        <div className="lg:w-[20%] items-center flex w-2/3">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-info rounded-md btn-sm hover:text-gray-100 bg-opacity-30 lg:hidden"
            >
              <FaBars className="text-xl"/>
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
            <img className="lg:w-[50px] w-[40px]" src={logo} alt="" />
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
                <li className="hover:bg-[#7c3c9c]" >
                  <label
                    onClick={() => setViewModal(true)}
                    htmlFor="UpdatePhoto"
                  >
                    <p className="text-gray-300 hover:text-white">Upload Photo</p>
                  </label>
                </li>
                <li className="hover:bg-[#7c3c9c]" role="button" onClick={handleLogOut}>
                  <p className="text-gray-300 hover:text-white">Logout</p>
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
                        {
                          uploadImg? 'Uploading...'
                          :
                          'Click to upload your photo'
                        }
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
