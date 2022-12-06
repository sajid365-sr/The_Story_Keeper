import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import Main from "../../Layouts/Main/Main";
import AdvertiseItems from "../../Pages/AdvertiseItems/AdvertiseItems";
import Blog from "../../Pages/Blog/Blog";
import BookDetails from "../../Pages/BookDetails/BookDetails";
import Categories from "../../Pages/Categories/Categories";
import AllBuyer from "../../Pages/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../../Pages/Dashboard/AllSeller/AllSeller";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import ReportedItems from "../../Pages/Dashboard/ReportedItems/ReportedItems";
import Home from "../../Pages/Home/Home";

import Login from "../../Pages/Login/Login";
import Shop from "../../Pages/Shop/Shop";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/home',
                element:<Home></Home>
            },
            {
                path:'/shop',
                loader: () => fetch('http://localhost:5000/allBooks'),
                element:<Shop></Shop>
            },
            {
                path:'/advertise',
                element:<AdvertiseItems></AdvertiseItems>
            },
            {
                path:'/blog',
                element:<Blog></Blog>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/category/:id',
                loader: ({params})=> fetch(`http://localhost:5000/category/${params.id}`),
                element: <PrivateRoute>
                    <Categories></Categories>
                </PrivateRoute>
            },
            {
                path:'/books/:id',
                loader: ({params})=> fetch(`http://localhost:5000/book/${params.id}`),
                element: <PrivateRoute>
                    <BookDetails></BookDetails>
                </PrivateRoute>
            },
            
        ]
        
    },
    {
        path:'/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>,
        </PrivateRoute>,
        children:[
            {
                path:'/dashboard/allSeller',
                element:<AdminRoute>
                    <AllSeller></AllSeller>
                </AdminRoute>
            },
            {
                path:'/dashboard/allBuyer',
                element:<AdminRoute>
                    <AllBuyer></AllBuyer>
                </AdminRoute>
            },
            {
                path:'/dashboard/reportedItems',
                element:<AdminRoute>
                    <ReportedItems></ReportedItems>
                </AdminRoute>
            },
            {
                path:'/dashboard/myOrders',
                element:<BuyerRoute>
                    <MyOrders></MyOrders>
                </BuyerRoute>
            },
            {
                path:'/dashboard/myProducts',
                element:<SellerRoute>
                    <MyProducts></MyProducts>
                </SellerRoute>
            },
        ]
    }

])