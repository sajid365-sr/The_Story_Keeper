
import { useEffect, useState } from 'react';

const UseVerifyUser = (email) => {
    const [userType, setUserType] = useState('');
    const [isUserLoading, setIsUserLoading] = useState(true);
console.log(userType)
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/type?email=${email}`)
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