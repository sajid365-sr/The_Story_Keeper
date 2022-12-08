
import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../Contexts/AuthContext/AuthContext";
import UseVerifyUser from "../../Hooks/UseVerifyUser";
import Header from "../../Pages/Shared/Header/Header";

const DashboardLayout = () => {
  const { user } = useContext(UserContext);
  const [userType] = UseVerifyUser(user?.email);

  return (
    <div>
      <Header></Header>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 gap-4 mt-20 w-80 bg-white text-base-content">
            {userType === "buyer" && (
              <Link
                className="font-bold bg-gray-100 px-5 py-2 rounded-lg shadow-xl mb-4 hover:bg-[#621e85] hover:text-gray-200 transition-all duration-500 text-xl text-gray-600"
                to="/dashboard/myOrders"
              >
                My Orders
              </Link>
            )}
            {userType === "seller" && (
              <>
              
              <Link
                className="font-bold bg-gray-100 px-5 py-2 rounded-lg shadow-xl mb-4 hover:bg-[#621e85] hover:text-gray-200 transition-all duration-500 text-xl text-gray-600"
                to="/dashboard/addAProduct"
              >
                Add A Product
              </Link>
              <Link
                className="font-bold bg-gray-100 px-5 py-2 rounded-lg shadow-xl mb-4 hover:bg-[#621e85] hover:text-gray-200 transition-all duration-500 text-xl text-gray-600"
                to="/dashboard/myProducts"
              >
                My Products
              </Link>
              </>
            )}
            {userType === "admin" && (
              <>
                <Link
                  className="font-bold bg-gray-100 px-5 py-2 rounded-lg shadow-xl mb-4 hover:bg-[#621e85] hover:text-gray-200 transition-all duration-500 text-xl text-gray-600"
                  to="/dashboard/allSeller"
                >
                  All Seller
                </Link>

                <Link
                  className="font-bold bg-gray-100 px-5 py-2 rounded-lg shadow-xl mb-4 hover:bg-[#621e85] hover:text-gray-200 transition-all duration-500 text-xl text-gray-600"
                  to="/dashboard/allBuyer"
                >
                  All Buyer
                </Link>

                <Link
                  className="font-bold bg-gray-100 px-5 py-2 rounded-lg shadow-xl mb-4 hover:bg-[#621e85] hover:text-gray-200 transition-all duration-500 text-xl text-gray-600"
                  to="/dashboard/reportedItems"
                >
                  Reported Item
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
