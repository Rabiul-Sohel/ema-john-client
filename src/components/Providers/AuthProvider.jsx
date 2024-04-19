import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {  createContext, useEffect, useState } from "react";
import { app } from "../../../firebase-config";


export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // create user
    const createUser = (email, password) =>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password)
    }
    // signin user
    const signinUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // signout user
    const signoutUser = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    // Observing user
    useEffect(()=>{
        const unSubscribed = onAuthStateChanged(auth, (currentUser)=>{
            console.log('observing', currentUser);
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unSubscribed
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        signinUser,
        signoutUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;