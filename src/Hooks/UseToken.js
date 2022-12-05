
import { useEffect, useState } from 'react';

const UseToken = (email,state) => {
    const [token, setToken] = useState("");
console.log(state)
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/jwt?email=${email}&state=${state.new}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("AccessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email,state]);
  return token;
};

export default UseToken;