import React, { Fragment, useEffect, useState } from "react";
import Axios from 'axios'
import {Button, Box, TextField} from '@mui/material'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [address, setAddress] = useState('');
    const [DOB, setDOB] = useState('');

    // do this after clicking the register button
    const registerUser = () => {
        Axios.post('http://localhost:5000/register', 
        {
            username: username,
            password: password,
            fname: fname,
            lname: lname,
            address: address,
            DOB: DOB
        }).then(response => {console.log(response)})
    }
    return (
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',  
        }}  
        >
            <TextField
                id="outlined-basic" label="Outlined" variant="outlined"
            >

            </TextField>
        </Box>    
    );
}

export default Register;