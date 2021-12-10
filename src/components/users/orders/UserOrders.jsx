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
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export default function() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {userName} = useParams();

    const [orders, setOrders] = useState({
        orders: [{
            id: '',
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
            car: {
                id: '',
                brand: '',
                model: '',
                body: '',
                yearOfIssue: '',
                numberOfSeats: '',
                transmission: '',
                price: '',
                status: ''
            },
            startDate: '',
            endDate: '',
            price: '',
            status: ''
        }]
    });
    const onOrdersChange = (ordersInfo) => setOrders(ordersInfo);

    useEffect(() => {
        axios.get(`http://localhost:8081/v2/order/${userName}`)
            .then(function (response) {
                console.log(response.data);
                onOrdersChange(response.data)
            })
            .catch(function (error) {
                //console.log(error.response.data);
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
                                <MenuItem><NavLink to={`/userhome/${userName}`} className="nav-link-user">Home</NavLink></MenuItem>
                                <MenuItem><NavLink to={`/userprofile/${userName}`} className="nav-link-user">Profile</NavLink></MenuItem>
                                <MenuItem><NavLink to="/" className="nav-link-user">Logout</NavLink></MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className="table-header">
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Model</TableCell>
                            <TableCell align="center">Year of issue</TableCell>
                            <TableCell align="center">Start Date</TableCell>
                            <TableCell align="center">End date</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {//orders.map((order) => (
                            Array.from(Array(orders.length)).map((_, index) => (
                            <TableRow>
                                <TableCell align="center">{orders[index]?.car?.brand}</TableCell>
                                <TableCell align="center">{orders[index]?.car?.model}</TableCell>
                                <TableCell align="center">{orders[index]?.car?.yearOfIssue}</TableCell>
                                <TableCell align="center">{orders[index]?.startDate}</TableCell>
                                <TableCell align="center">{orders[index]?.endDate}</TableCell>
                                <TableCell align="center">{orders[index]?.price}</TableCell>
                                <TableCell align="center">{orders[index]?.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}