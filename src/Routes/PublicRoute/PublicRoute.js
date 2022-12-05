import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main/Main";
import AdvertiseItems from "../../Pages/AdvertiseItems/AdvertiseItems";
import Blog from "../../Pages/Blog/Blog";
import BookDetails from "../../Pages/BookDetails/BookDetails";
import Categories from "../../Pages/Categories/Categories";
import Home from "../../Pages/Home/Home";

import Login from "../../Pages/Login/Login";
import Shop from "../../Pages/Shop/Shop";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
        
    }
])