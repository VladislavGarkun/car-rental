import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import '../../CSS/Main.css'
import { NavLink } from "react-router-dom";
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function ButtonAppBar() {

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar className='header-toolbar'>
          <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
            VladislavMotors
          </Typography>
          <div className="login-button">
            <Button color='inherit'><NavLink to="/signin" className="nav-link-login">Sign In</NavLink> </Button>
            <Button color='inherit'><NavLink to="/signup" className="nav-link-login">Sign Up</NavLink></Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}