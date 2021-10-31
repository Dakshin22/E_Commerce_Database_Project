import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import {Link} from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('')
    

    const userLogin = async e =>{
        e.preventDefault();

        Axios.get(`http://localhost:5000/${username}/${password}`)
        .then((response) => {
            if (response.data.message)
                setLoginStatus(response.data.message)
                
            else
                setLoginStatus(response.data[0].username)
        })           
    }

    return (
        <Fragment>
            <h1 className='text-center mt-5'>Login</h1>
            <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <form onSubmit = {userLogin}>
                    <div className="form-group row">
                        <div>
                            <input
                                type="text"
                                maxLength = "20"
                                className="form-control"
                                placeholder="Username"
                                onChange={e => setUsername(e.target.value)} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div>
                            <input
                                type="password"
                                maxLength = "20"
                                className="form-control"
                                placeholder="Password"                                
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <button type='submit' className="btn btn-primary">Login</button>
                    <Link to = '/register'>
                        <button type='button' className="btn btn-success ml-3">Register</button>
                    </Link>
                </form> 
                <h2>{loginStatus}</h2>               
            </div>   

                  
        </Fragment>
    )
}

export default Login