import React, { createContext, useState } from "react";


export const UserContext = createContext();

const AuthContext = ({ children }) => {

const [user, setUser] = useState(null);






const authInfo = {user}

  return (
    <div>
      <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
    </div>
  );
};

export default AuthContext;
