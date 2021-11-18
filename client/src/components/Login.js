import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { render } from "react-dom";
import {Link, useHistory} from 'react-router-dom'
import Transfer from "./Transfer";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState('')
    
    let history = useHistory()
    
    const userLogin = async e =>{
        e.preventDefault();

        Axios.post(`http://localhost:5000`,
        {
            username: username,
            password: password
        }
        )
        .then((response) => {
            console.log(response);
            if (response.data.message)
                setInvalidLogin(response.data.message)             
            else
            {               
                history.push({pathname: '/transfer', state: {username: username}})               
            }
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
                <h2>{invalidLogin}</h2>               
            </div>   

                  
        </Fragment>
    )
}

export default Login