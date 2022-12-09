
import { useEffect, useState } from 'react';

const UseVerifyUser = (email) => {
    const [userType, setUserType] = useState('');
    const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/type?email=${email}`,{
        headers:{
          authorization: `Bearer ${localStorage.getItem('AccessToken')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
        
          setUserType(data.userType);
          setIsUserLoading(false)
        });
    }
  }, [email]);
  return [userType, isUserLoading];
};

export default UseVerifyUser;