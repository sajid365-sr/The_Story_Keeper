
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../Contexts/AuthContext/AuthContext';


const UseGetAdvertiseItem = () => {
    const {logOut} = useContext(UserContext);
    
const {data:items = [], refetch} = useQuery({
    queryKey:['items'],
    queryFn: async()=>{
        const res = await fetch('http://localhost:5000/advertise',{
            headers:{
                authorization : `Bearer ${localStorage.getItem('AccessToken')}`
              }
        });
        const data = await res.json();
        if(data.message === 'Forbidden Access'){
            logOut();
          }
        return data;
        
    }
})
refetch();
    

    return [items, refetch];
};

export default UseGetAdvertiseItem;