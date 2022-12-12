
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/AuthContext/AuthContext';

const UseVerifyUser = (email) => {
    const [userType, setUserType] = useState('');
    const [isUserLoading, setIsUserLoading] = useState(true);
    const {logOut} = useContext(UserContext);
    const navigate = useNavigate();

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
            logOut();
            navigate('/login');
          }
          setUserType(data.userType);
          setIsUserLoading(false)
        });
    }
  }, [email,logOut,userType,navigate]);
  return [userType, isUserLoading];
};

export default UseVerifyUser;