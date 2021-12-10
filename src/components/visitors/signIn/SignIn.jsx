import { TextField } from "@mui/material"
import '../../css/SignIn.css'
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

  const[signInData, setSignInData] = useState({
      authData: {
          userName: '',
          password: ''
      }
  })

  const navigate = useNavigate();

  const [errorLabel, setErrorLabel] = useState('');
  const onErrorLabelChange = (message) => setErrorLabel(message);

  function authentication() {
    axios.post("http://localhost:8081/v2/user/login", {
      userName: signInData.userName,
      password: signInData.password,
    })
        .then(function (response) {
          console.log(response);
          if(response.data.userRole.role === "USER") {
              navigate(`/userhome/${response.data.userName}`)
          }else{
              navigate(`/adminhome/${response.data.userName}`)
          }

        })
        .catch(function (error) {
            onErrorLabelChange(error.response.data.mess);
        });
  }

    function handle(e) {
        const newData = {...signInData}
        newData[e.target.id] = e.target.value
        setSignInData(newData)
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

      <div className = 'sign-in'>
          <TextField
            value={signInData.userName}
            id="userName"
            onChange={(e) => handle(e)}
            margin="normal"
            required
            label="User name"
            placeholder="User name"
          />

          <TextField
            value={signInData.password}
            id="password"
            type="password"
            onChange={(e) => handle(e)}
            margin="normal"
            required
            label="Password"
            placeholder="Password"
          />

          <Button onClick={authentication}><label className="button-sign-in">Login</label></Button>

        <NavLink to="/signup" className="nav-link-registred">Not regisred yet?</NavLink>

          <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
              {errorLabel}
          </Typography>

      </div>
    </>
  );
}