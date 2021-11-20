import Axios from "axios";
import React, { Fragment, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState('')
    
    let navigate = useNavigate()
    
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
                setInvalidLogin('');               
                navigate('/', {state: {username: username }})               
            }
        })         
    }

    return (
        <Fragment>
            <div className = 'mt-5 mr-5' style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <form onSubmit = {userLogin}>
                    <div className="form-group row">
                        <div>
                            <small id = "loginStatus" class = "text-danger">{invalidLogin}</small>
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
            </div>   

                  
        </Fragment>
    )
}

export default Login