import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import Main from "../../Layouts/Main/Main";
import AdvertiseItems from "../../Pages/AdvertiseItems/AdvertiseItems";
import Blog from "../../Pages/Blog/Blog";
import BookDetails from "../../Pages/BookDetails/BookDetails";
import Categories from "../../Pages/Categories/Categories";
import AddAProduct from "../../Pages/Dashboard/Seller/AddAProduct/AddAProduct";
import AllBuyer from "../../Pages/Dashboard/Admin/AllBuyer/AllBuyer";
import AllSeller from "../../Pages/Dashboard/Admin/AllSeller/AllSeller";
import MyOrders from "../../Pages/Dashboard/Buyer/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/Seller/MyProducts/MyProducts";
import Home from "../../Pages/Home/Home";

import Login from "../../Pages/Login/Login";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import Shop from "../../Pages/Shop/Shop";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import AdvertiseItemRote from "../AdvertiseItemRote/AdvertiseItemRote";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import WishList from "../../Pages/Dashboard/Buyer/WishList/WishList";
import Payment from "../../Pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/shop",
        loader: () => fetch("http://localhost:5000/allBooks"),
        element: <Shop></Shop>,
      },
      {
        path: "/advertise",
        element: (
          <AdvertiseItemRote>
            <AdvertiseItems></AdvertiseItems>
          </AdvertiseItemRote>
        ),
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/category/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/category/${params.id}`),
        element: (
          <PrivateRoute>
            <Categories></Categories>
          </PrivateRoute>
        ),
      },
      {
        path: "/books/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/book/${params.id}`),
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>,
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/allSeller",
        element: (
          <AdminRoute>
            <AllSeller></AllSeller>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allBuyer",
        element: (
          <AdminRoute>
            <AllBuyer></AllBuyer>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/myOrders",
        element: (
          <BuyerRoute>
            <MyOrders></MyOrders>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/myWishList",
        element: (
          <BuyerRoute>
            <WishList></WishList>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        loader: ({params}) => fetch(`http://localhost:5000/payment/${params.id}`),
        element: (
          <BuyerRoute>
            <Payment></Payment>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/payment2/:id",
        loader: ({params}) => fetch(`http://localhost:5000/payment2/${params.id}`),
        element: (
          <BuyerRoute>
            <Payment></Payment>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/addAProduct",
        element: (
          <SellerRoute>
            <AddAProduct></AddAProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myProducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
