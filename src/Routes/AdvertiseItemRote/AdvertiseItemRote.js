

import { Navigate, useLocation } from 'react-router-dom';
import UseGetAdvertiseItem from '../../Hooks/UseGetAdvertiseItem';

const AdvertiseItemRote = ({children}) => {
   const [items] = UseGetAdvertiseItem();
   const location = useLocation();

   if(items.length >= 1){
    return children;
   }
   return <Navigate to='/shop' state={{from:location}} replace></Navigate>
};

export default AdvertiseItemRote;