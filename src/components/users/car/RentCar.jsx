import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../../css/Home.css'
import { NavLink } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from "axios";
import {Grid, ImageList, ImageListItem, ImageListItemBar, TextField} from "@mui/material";
import {useParams} from "react-router";
import '../../css/Car.css'
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import {DesktopDatePicker} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useNavigate } from "react-router";

export default function Car() {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {carId} = useParams();

    const {userName} = useParams();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const navigate = useNavigate();

    const rentCar = () => {
        axios.post("http://localhost:8081/v2/order", {
            carId: carId,
            userName: userName,
            startDate: startDate,
            endDate: endDate,
        })
            .then(function (response) {
                console.log(response);
                navigate(`/user-home/${userName}`)

            })
            .catch(function (error) {
                console.log(error.response.data);
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
                                <MenuItem><NavLink to={`/userhome/${userName}`} className="nav-link-user">Home</NavLink></MenuItem>
                                <MenuItem><NavLink to={`/userprofile/${userName}`} className="nav-link-user">Profile</NavLink></MenuItem>
                                <MenuItem><NavLink to={`/user/orders/${userName}`} className="nav-link-user">Orders</NavLink></MenuItem>
                                <MenuItem><NavLink to="/" className="nav-link-user">Logout</NavLink></MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className="car-rent">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                            label="Start date"
                            value={startDate}
                            minDate={new Date()}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            label="End date"
                            value={endDate}
                            minDate={new Date()}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>

                <Button onClick={rentCar}><label className="rent-button">Rent</label></Button>

            </div>
        </>
    );
}