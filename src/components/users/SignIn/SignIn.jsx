import { TextField } from "@mui/material"
import '../../CSS/SignIn.css'
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

export default function SignIn(){
  const[userName, setUserName] = useState('');
  const onUserNameChange = (event) => setUserName(event.target.value);

  const[password, setPassword] = useState('');
  const onPasswordChange = (event) => setPassword(event.target.value);

  const navigate = useNavigate();

  const [errorLable, setErrorLabel] = useState('');
  const onErrorLableChange = (message) => setErrorLabel(message);

  function authentication() {
    axios.post("http://localhost:8081/v2/user/login", {
      userName: userName,
      password: password,
    })
        .then(function (response) {
          console.log(response);
          //errorLable = "Invalid username/password supplied"
          //alert(response.data.body.mess)
          navigate(`/user-home/${response.data.userName}`)
        })
        .catch(function (error) {
          //console.log(error);
          //errorLable = "Invalid username/password supplied"
            onErrorLableChange(error.response.data.mess);
            //console.log(error.response.data);
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

      <div className = 'signIn'>

          <label>User Name</label>
          <TextField
            value={userName}
            onChange={onUserNameChange}
            margin="normal"
            required
            id="outlined-required"
            label="Required"
            placeholder="User name"
          />



          <label className='pass'>Password</label>
          <TextField
              className='pass'
            value={password}
            onChange={onPasswordChange}
            margin="normal"
            required
            id="outlined-required"
            label="Required"
            placeholder="Password"
          />



        <Button onClick={authentication} color='inherit'>Login</Button>


        <NavLink to="/signup" className="nav-link-registred">Not regisred yet?</NavLink>

          <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
              {errorLable}
          </Typography>

      </div>
    </>
  );
}