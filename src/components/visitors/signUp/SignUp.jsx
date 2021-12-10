import { TextField } from "@mui/material"
import '../../css/SignUp.css'
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useNavigate } from "react-router";
import * as React from "react";

export default function SignUp(){

    const [errorLabel, setErrorLabel] = useState('');
    const onErrorLabelChange = (message) => setErrorLabel(message);

    const[signUpData, setSignUpData] = useState({
        signUpData: {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordRepeat: '',
            phone: ''
        }
    })

    function handle(e) {
        const newData = {...signUpData}
        newData[e.target.id] = e.target.value
        setSignUpData(newData)
    }

    const navigate = useNavigate();

    function registration() {
        axios.post("http://localhost:8081/v2/user/registration", {
            firstName: signUpData.firstName,
            lastName: signUpData.lastName,
            userName: signUpData.userName,
            email: signUpData.email,
            password: signUpData.password,
            passwordRepeat: signUpData.passwordRepeat,
            phone: signUpData.phone
        })
            .then(function (response) {
                console.log(response);
                navigate(`/userhome/${response.data.userName}`)
            })
            .catch(function (error) {
                onErrorLabelChange(error.response.data.mess);
            });
    }

    return (
    <>
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
            <Toolbar className='header-toolbar'>
                <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
                    VladislavMotors
                </Typography>

                <Button color='inherit'><NavLink to="/" className="nav-link-home">Home</NavLink> </Button>
            </Toolbar>
            </AppBar>
        </Box>
        <div className = 'signUp'>
            <TextField
                value={signUpData.firstName}
                id="firstName"
                onChange={(e) => handle(e)}
                margin="normal"
                size="string"
                required
                label="Name"
                placeholder="Name"
            />
            <TextField
                value={signUpData.lastName}
                id="lastName"
                onChange={(e) => handle(e)}
                margin= "normal"
                required
                label="Surname"
                placeholder="Surname"
            />
            <TextField
                value={signUpData.userName}
                id="userName"
                onChange={(e) => handle(e)}
                margin= "normal"
                required
                label="User Name"
                placeholder="User Name"
            />
            <TextField
                value={signUpData.email}
                id="email"
                onChange={(e) => handle(e)}
                margin= "normal"
                required
                label="Email"
                placeholder="Email"
            />
            <TextField
                value={signUpData.password}
                id="password"
                type="password"
                onChange={(e) => handle(e)}
                margin= "normal"
                required
                label="Password"
                placeholder="Password"
            />
            <TextField
                value={signUpData.passwordRepeat}
                id="passwordRepeat"
                type="password"
                onChange={(e) => handle(e)}
                margin= "normal"
                required
                label="Repeat password"
                placeholder="Repeat password"
            />
            <TextField
                value={signUpData.phone}
                id="phone"
                onChange={(e) => handle(e)}
                margin= "normal"
                required
                label="Phone number"
                placeholder="Phone number"
            />

            <Button onClick={registration}><label className="button-sign-up">Register</label></Button>
            <NavLink to="/signin" className="nav-link-registred">Already regisred?</NavLink>

            <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
                {errorLabel}
            </Typography>
        </div>
    </>
   );
}