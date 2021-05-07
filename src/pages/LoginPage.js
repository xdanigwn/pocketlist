import axios from 'axios';
import React, { useState, useContext } from 'react'
import AuthContext from "context/AuthContext"
import { useHistory } from 'react-router';

function LoginPage()  {
    const [username , setUser ] = useState("");
    const [pass , setPass ] = useState("");

    const { getLoggedIn }  = useContext(AuthContext)
    const history = useHistory();

    async function submitLogin(e) {
        e.preventDefault();
        try {
            const loginData = {
                username,
                pass
            };

            await axios.post("https://admin-pocketlist.herokuapp.com/api/v1/login", loginData)
            // alert(res.data);
            .then((res) => {
                if ((res.data === "Username tidak ada!") || (res.data === "Password syalah!")){
                    return alert(res.data)
                } 
            })
            await getLoggedIn();
            history.push("/landingpage")
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
                                                name="pass" placeholder="Password"></input>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-user btn-block" >
                                        Login
                                        </button>

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