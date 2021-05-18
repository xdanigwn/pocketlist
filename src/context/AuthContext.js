import axios from "axios";
import React, { createContext, useState, useEffect, useCallback} from 'react'

const AuthContext = createContext();

// ====== AUTHCHECK => SETLOGGEDIN = TRUE => PASS TO AUTHCONTEXT ========== // 

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false) // STATE GLOBAL
    const [userId, setUserId] = useState("") // STATE GLOBAL
   
     const  getLoggedIn = useCallback( async () => {
      
        const loggedInRes = await axios.get("http://localhost:3000/api/v1/authcheck" ); //run endpoint authcheck. return true / false
        setUserId(loggedInRes.data.username)
        setLoggedIn(true)
      
        
        // setLoggedIn(loggedInRes.data.status) // fill with true/false = data loggedInRes
        // setMyToken(loggedInRes.data.mytoken)
      }, [])

    useEffect(() => {
       
        getLoggedIn(); // when startup component, run function 
       
    }, [getLoggedIn]);

    return <AuthContext.Provider value={{userId, loggedIn, getLoggedIn}}> 
        {props.children} 
    </AuthContext.Provider> // return value nya adalah nilai loggedin setelah di cek cookiesnya. children = router

};

export default AuthContext;
export { AuthContextProvider };

