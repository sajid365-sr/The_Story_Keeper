import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../Contexts/AuthContext/AuthContext";
import UseVerifyUser from "../../Hooks/UseVerifyUser";
import Header from "../../Pages/Shared/Header/Header";
import { FaAlignRight } from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = useContext(UserContext);
  const [userType] = UseVerifyUser(user?.email);
  const linkStyle = 'font-bold bg-gray-100 px-5 py-2 rounded-lg shadow-xl mb-4 hover:bg-[#621e85] hover:text-gray-200 transition-all duration-500 text-xl text-gray-600'

  
  

  return (
    <div>
      
      <Header></Header>
       {/* Dashboard toggle button */}
       <div className="flex lg:hidden justify-end -mt-16 mr-16">
       <label
              htmlFor="dashboard-drawer"
              tabIndex={2}
              className="btn btn-ghost lg:hidden"
            >
              <FaAlignRight className="text-xl"/>
            </label>
       </div>
        
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
          <ul className="menu p-4 gap-4 lg:mt-20 pt-10 lg:pt-0 w-80 bg-white text-base-content">
            {userType === "buyer" && (
              <>
                <Link
                  className={`${linkStyle}`}
                  to="/dashboard/myOrders"
                >
                  My Orders
                </Link>
                <Link
                  className={`${linkStyle}`}
                  to="/dashboard/myWishList"
                >
                  Wish List
                </Link>
              </>
            )}
            {userType === "seller" && (
              <>
                <Link
                  className={`${linkStyle}`}
                  to="/dashboard/addAProduct"
                >
                  Add A Product
                </Link>
                <Link
                  className={`${linkStyle}`}
                  to="/dashboard/myProducts"
                >
                  My Products
                </Link>
              </>
            )}
            {userType === "admin" && (
              <>
                <Link
                  className={`${linkStyle}`}
                  to="/dashboard/allSeller"
                >
                  All Seller
                </Link>

                <Link
                  className={`${linkStyle}`}
                  to="/dashboard/allBuyer"
                >
                  All Buyer
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
