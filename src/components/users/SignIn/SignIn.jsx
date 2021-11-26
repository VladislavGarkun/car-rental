import { TextField } from "@mui/material"
import '../../CSS/SignIn.css'
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import setAuthTrue from '../../base/Home/Home'
import { useLocation } from 'react-router-dom';
import { authorized } from "../../base/Home/Home";
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function SignIn(){
  const[userName, setUserName] = useState('');
  const onUserNameChange = (event) => setUserName(event.target.value);

  const[password, setPassword] = useState('');
  const onPasswordChange = (event) => setPassword(event.target.value);

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
        <TextField
          value={userName}
          onChange={onUserNameChange}
          margin="normal"
          required
          id="outlined-required"
          label="Required"
          placeholder="User name"
        />
        <TextField
          value={password}
          onChange={onPasswordChange}
          margin="normal"
          required
          id="outlined-required"
          label="Required"
          placeholder="Password"
        />
        
        <Button color='inherit'><NavLink to={`/user-home/${userName}`} className="nav-link-signin">Login</NavLink></Button>
        <NavLink to="/signup" className="nav-link-registred">Not regisred yet?</NavLink>
      </div>
    </>
  );
}