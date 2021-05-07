import axios from "axios";
import React, { createContext, useState, useEffect } from 'react'

const AuthContext = createContext();

// ====== AUTHCHECK => SETLOGGEDIN = TRUE => PASS TO AUTHCONTEXT ========== // 

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false) // STATE GLOBAL
    const [userId, setUserId] = useState("") // STATE GLOBAL


    async function getLoggedIn() { 
        const loggedInRes = await axios.get("http://localhost:3000/api/v1/authcheck"); //run endpoint authcheck. return true / false
        setUserId(loggedInRes.data.verif_user)
        setLoggedIn(loggedInRes.data.status) // fill with true/false = data loggedInRes
    }

    useEffect(() => {
        getLoggedIn(); // when startup component, run function 
    }, []);

    return <AuthContext.Provider value={{loggedIn, userId, getLoggedIn}}> 
        {props.children} 
    </AuthContext.Provider> // return value nya adalah nilai loggedin setelah di cek cookiesnya. children = router

};

export default AuthContext;
export { AuthContextProvider };

