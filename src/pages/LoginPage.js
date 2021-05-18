import axios from 'axios';
import React, { useState, 
    useContext 
} from 'react'
import AuthContext from "context/AuthContext"
import { useHistory } from 'react-router';

function LoginPage()  {
    const [username , setUser ] = useState("");
    const [password , setPass ] = useState("");
    // const [dataCookie, setDataCookie] = useState(null);

    const { getLoggedIn }  = useContext(AuthContext)
    const history = useHistory();

    // async function Actlogout(e) {
    //     e.preventDefault();
    //     await axios.get("http://localhost:3000/api/v1/logout" )
    //     .then((res) => {
    //         // console.log(res.data);
    //     })
    // }

    // async function getCookies(e) {
    //     e.preventDefault();
    //     await axios.get("http://localhost:3000/api/v1/authcheck" )
    //     .then((res) => {
    //         console.log(res.data)
    //         setDataCookie(res.data)
            
    //     })
    // }

    function submitLogin(e) {
        e.preventDefault();
        try {
            const loginData = {
                username,
                password
            };

            // await axios.post("http://localhost:3000/api/v1/login", loginData, {withCredentials: true})
            // alert(res.data);
            axios({
                method: "POST",
                data: loginData,
                withCredentials: true,
                url: "http://localhost:3000/api/v1/login",
            }).then(async (res) => {
                // if ((res.data === "Username tidak ada!") || (res.data === "Password syalah!")){
                if (res.data === "Successfully Authenticated"){
                    // console.log(res.data)
                    await getLoggedIn();
                    history.push("/landingpage")
                }else{
                    alert("Username / Password Salah")
                    history.push("/")
                }
            })
            
            // await getLoggedIn();
            // history.push("/landingpage")
            // Redirect("http://localhost:3001/landingpage")
        } catch (err) {
            console.error(err)
        }
    }

        return (
            <> 
                
                <div className="bg-primary bg-fullheight">
                    <div className="container">
                        <div className="row justify-content-center">

                        <div className="col-xl-6 col-lg-12 col-md-9 mt-5">
                        
                            <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body  */}
                                <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                    <div className="text-center">
                                        <p className="h4 text-gray-900 mb-4">Pocketlist - Client</p>
                                    </div>
                                    <form className="user" onSubmit={submitLogin}>
                                        <div className="form-group">
                                        <input type="text" 
                                                onChange = {(e) => setUser(e.target.value)}
                                                value={username}
                                                className="form-control form-control-user" 
                                                name="username" 
                                                placeholder="Username" ></input>
                                        </div>
                                        <div className="form-group">
                                        <input type="password"
                                                onChange = {(e) => setPass(e.target.value )} 
                                                className="form-control 
                                                form-control-user" 
                                                id="exampleInputPassword"
                                                name="password" placeholder="Password"></input>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-user btn-block" >
                                        Login
                                        </button>
                                        {/* <button onClick={getCookies} className="btn btn-primary btn-user btn-block" >
                                        Get Cookies
                                        </button>
                                        <button onClick={Actlogout} className="btn btn-primary btn-user btn-block" >
                                        Logout
                                        </button> */}
                                        {/* {dataCookie ? <h1>Welcome Back {dataCookie.username}</h1> : null} */}
                                    </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                        </div>

                        </div>              

                    </div>
                </div>
                   
            </>
        )

}


export default LoginPage