import React, { Fragment, useEffect, useState } from "react";
import Axios from 'axios'
import {Button, Box, TextField, Grid} from '@mui/material'

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
            <Box component="form" noValidate onSubmit={registerUser} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="Address"
                            label="Address"
                            type="Address"
                            id="Address"
                            autoComplete="Address"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Box>  
        </Box>
        
        
    );
}

export default Register;