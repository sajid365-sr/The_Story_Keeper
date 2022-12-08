
import { useQuery } from '@tanstack/react-query';
import  { useEffect, useState } from 'react';

const UseGetAdvertiseItem = () => {
    // const [AdvertiseItems, setAdvertiseItem] = useState([])


const {data:items = [], refetch} = useQuery({
    queryKey:['items'],
    queryFn: async()=>{
        const res = await fetch('http://localhost:5000/advertise');
        const data = await res.json();
        return data;
    }
})
    
    // useEffect( () =>{
    //     fetch('http://localhost:5000/advertise')
    //     .then(res => res.json())
    //     .then(data => {
    //         setAdvertiseItem(data);
    //     })
    // },[])

    
    return [items, refetch];
};

export default UseGetAdvertiseItem;