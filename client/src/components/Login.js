import React, { Fragment, useEffect, useState } from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Fragment>
            <h1 className='text-center mt-5'>Login</h1>
            <div>
                <form>
                    <div class="form-group row">
                        <div class = 'col-xs-2'>
                            <input
                                type="text"
                                maxLength = "20"
                                class="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class = 'col-xs-2'>
                            <input
                                type="password"
                                maxLength = "20"
                                class="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <button type='submit' class="btn btn-primary">Login</button>
                </form>
            </div>
        </Fragment>
    )
}

export default Login