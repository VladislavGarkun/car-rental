import '../../css/Home.css'
import * as React from 'react';
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
import { useParams } from "react-router";
import axios from "axios";
import {Grid} from "@mui/material";
import Item from "../../base/item/Item";
import AdminCarInfo from "../../admins/car/AdminCarInfo";

export default function() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {userName} = useParams();

    const [cars, setCars] = useState({
        cars: [{
            id: '',
            brand: '',
            model: '',
            body: '',
            yearOfIssue: '',
            numberOfSeats: '',
            transmission: '',
            price: '',
            status: ''
        }]
    });
    const onCarsChange = (carsInfo) => setCars(carsInfo);


    useEffect(() => {
        axios.get("http://localhost:8081/v2/car/all")
            .then(function (response) {
                console.log(response.data);
                onCarsChange(response.data)
            })
            .catch(function (error) {
                console.log(error.response.data.mess);
            });

    },[]);

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
                                <MenuItem><NavLink to={`/adminprofile/${userName}`} className="nav-link-user">Profile</NavLink></MenuItem>
                                <MenuItem><NavLink to={`/addcar/${userName}`} className="nav-link-user">Add car</NavLink></MenuItem>
                                <MenuItem><NavLink to={`/admin/orders/${userName}`} className="nav-link-user">Orders</NavLink></MenuItem>
                                <MenuItem><NavLink to="/" className="nav-link-user">Logout</NavLink></MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className="grid-car">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(cars.length)).map((_, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Item><AdminCarInfo carInfo = {cars[index]} userName = {userName}/></Item>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
}