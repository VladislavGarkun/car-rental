import {useNavigate, useParams} from "react-router";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { NavLink } from "react-router-dom";
import {useEffect, useState} from 'react'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { TextField } from "@mui/material"
import Button from '@mui/material/Button';
import '../../css/Profile.css'
import * as React from "react";
import axios from "axios";

export default function() {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {userName} = useParams();

    const navigate = useNavigate();

    const[user, setUser] = useState({
        user: {
            id: '',
            userRole: {
                id: '',
                role: ''
            },
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: ''
        },
    })
    const onUserChange = (userData) => setUser(userData)

    useEffect(() => {
        axios.get(`http://localhost:8081/v2/user/${userName}`)
            .then(function (response) {
                console.log(response.data);
                onUserChange(response.data)
            })
            .catch(function (error) {
                //console.log(error.response.data);
            });
    },[]);

    function saveEdit() {
        axios.put("http://localhost:8081/v2/user", {
            id: user.id,
            userRole: {
                id: user.userRole.id,
                role: user.userRole.role
            },
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            passwordRepeat: user.passwordRepeat,
            phone: user.phone
        })
            .then(function (response) {
                console.log(response);
                navigate(`/userhome/${response.data.userName}`)
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    function handle(e) {
        const newData = {...user}
        newData[e.target.id] = e.target.value
        setUser(newData)
    }

    return(
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
                            <MenuItem><NavLink to={`/adminhome/${userName}`} className="nav-link-user">Home</NavLink></MenuItem>
                            <MenuItem><NavLink to={`/addcar/${userName}`} className="nav-link-user">Add car</NavLink></MenuItem>
                            <MenuItem><NavLink to={`/admin/orders/${userName}`} className="nav-link-user">Orders</NavLink></MenuItem>
                            <MenuItem><NavLink to="/" className="nav-link-user">Logout</NavLink></MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

            <div className = 'profile-info'>
                <TextField
                    value={user.firstName}
                    id="firstName"
                    onChange={(e) => handle(e)}
                    margin="normal"
                    size="string"
                    required
                    label="Name"
                    placeholder="Name"
                />
                <TextField
                    value={user.lastName}
                    id="lastName"
                    onChange={(e) => handle(e)}
                    margin= "normal"
                    required
                    label="Surname"
                    placeholder="Surname"
                />
                <TextField
                    value={user.userName}
                    id="userName"
                    onChange={(e) => handle(e)}
                    margin= "normal"
                    required
                    label="User Name"
                    placeholder="User Name"
                />
                <TextField
                    value={user.email}
                    id="email"
                    onChange={(e) => handle(e)}
                    margin= "normal"
                    required
                    label="Email"
                    placeholder="Email"
                />
                <TextField
                    value={user.password}
                    id="password"
                    onChange={(e) => handle(e)}
                    margin= "normal"
                    required
                    label="Password"
                    placeholder="Password"
                />
                <TextField
                    value={user.phone}
                    id="phone"
                    onChange={(e) => handle(e)}
                    margin= "normal"
                    required
                    label="Phone number"
                    placeholder="Phone number"
                />

                <Button onClick={saveEdit}><label className="save-button">Save</label></Button>
            </div>

        </Box>
    );
}