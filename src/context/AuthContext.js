import axios from "axios";
import React, { createContext, useState, useEffect, useCallback} from 'react'

const AuthContext = createContext();

// ====== AUTHCHECK => SETLOGGEDIN = TRUE => PASS TO AUTHCONTEXT ========== // 

function AuthContextProvider(props) {
    const [userId, setUserId] = useState("") // STATE GLOBAL
    const [name, setName] = useState("") // STATE GLOBAL
   
     const  getLoggedIn = useCallback( async () => {
      
        const loggedInRes = await axios.get("https://admin-pocketlist.herokuapp.com/api/v1/authcheck" ); //run endpoint authcheck. return true / false
        setUserId(loggedInRes.data.username)
        setName(loggedInRes.data.fullname)
        
        // setLoggedIn(loggedInRes.data.status) // fill with true/false = data loggedInRes
        // setMyToken(loggedInRes.data.mytoken)
      }, [])

    useEffect(() => {
       
        getLoggedIn(); // when startup component, run function 
       
    }, [getLoggedIn]);

    return <AuthContext.Provider value={{userId, name, getLoggedIn}}> 
        {props.children} 
    </AuthContext.Provider> // return value nya adalah nilai loggedin setelah di cek cookiesnya. children = router

};

export default AuthContext;
export { AuthContextProvider };

