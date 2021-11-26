import '../../CSS/Main.css'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { NavLink } from "react-router-dom";
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useParams } from "react-router";

export default function() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {userName} = useParams();

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
                <Toolbar className='header-toolbar'>
                    <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
                        VladislavMotors
                    </Typography>

                    <Typography variant="h6" className="user-name" component="div" align="right" sx={{ flexGrow: 1 }}>
                        {userName}
                    </Typography>

                    <div className="authorize-panel">
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem /*onClick={handleClose}*/><NavLink to={`/profile/${userName}`} className="nav-link-user">Profile</NavLink></MenuItem>
                            <MenuItem /*onClick={handleClose}*/><NavLink to="/" className="nav-link-user">Logout</NavLink></MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

        </Box>
    );
}