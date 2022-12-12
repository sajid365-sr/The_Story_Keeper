
import { useEffect, useState } from 'react';

const UseToken = (email) => {
    const [token, setToken] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`https://the-story-keeper-server-sajid365-sr.vercel.app/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("AccessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return token;
};

export default UseToken;