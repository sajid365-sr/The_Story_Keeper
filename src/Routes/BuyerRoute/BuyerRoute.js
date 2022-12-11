
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../Contexts/AuthContext/AuthContext';
import UseVerifyUser from '../../Hooks/UseVerifyUser';
import Loading from '../../Pages/Shared/Loading/Loading';

const BuyerRoute = ({children}) => {
    const {user, loading} = useContext(UserContext);
    const [userType, isUserLoading] = UseVerifyUser(user?.email);
    const location = useLocation();
    
    if(loading || isUserLoading){
        return <Loading></Loading>
    }
    if(user && userType === 'buyer'){
        return children;
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default BuyerRoute;