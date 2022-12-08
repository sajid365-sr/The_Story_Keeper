
import { useQuery } from '@tanstack/react-query';


const UseGetAdvertiseItem = () => {
    
const {data:items = [], refetch} = useQuery({
    queryKey:['items'],
    queryFn: async()=>{
        const res = await fetch('http://localhost:5000/advertise');
        const data = await res.json();
        return data;
        
    }
})
refetch();
    

    return [items, refetch];
};

export default UseGetAdvertiseItem;