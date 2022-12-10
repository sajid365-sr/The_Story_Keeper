
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Contexts/AuthContext/AuthContext';

const UseVerifyUser = (email) => {
    const [userType, setUserType] = useState('');
    const [isUserLoading, setIsUserLoading] = useState(true);
    const {logOUt} = useContext(UserContext);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/type?email=${email}`,{
        headers:{
          authorization: `Bearer ${localStorage.getItem('AccessToken')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.message === 'Forbidden Access'){
            logOUt();
          }
          setUserType(data.userType);
          setIsUserLoading(false)
        });
    }
  }, [email]);
  return [userType, isUserLoading];
};

export default UseVerifyUser;