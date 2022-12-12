import React, { createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from "../../Firebase/Firebase.config";

export const UserContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthContext = ({ children }) => {

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

// email/password create user
const createUser = (email, password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email, password);
}

// email/password login user
const signIn = (email, password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
}
// update user
const updateUser = (userInfo) =>{
    setLoading(true);
    return updateProfile(auth.currentUser, userInfo)
}

// Google signIn
const googleSignIn = () =>{
    return signInWithPopup(auth, googleProvider);
}
// Facebook SignIn
const facebookSignIn = () =>{
    return signInWithPopup(auth, facebookProvider );
}

// Logout user
const logOut = () =>{
    return signOut(auth);
}

// user state observer
useEffect( () =>{
    const unsubscribe = onAuthStateChanged( auth, (currentUser) =>{
        setUser(currentUser);
        setLoading(false);
    })
    return () =>{
        unsubscribe();
    }
}, [])

console.log(user)

const authInfo = {user,  createUser, signIn, logOut, updateUser, loading, googleSignIn, facebookSignIn }

  return (
    <div>
      <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
    </div>
  );
};

export default AuthContext;
