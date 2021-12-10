import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../../css/Car.css'
import { NavLink } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from "axios";
import Item from "../../base/item/Item";
import {Grid, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import UserCarInfo from './UserCarInfo';
import {useParams} from "react-router";
import '../../css/Car.css'
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function UserCar() {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const[photos, setPhotos] = useState({
        photos: [{
            id: '',
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
            photoUrl: ''
        }]
    });
    const onPhotosChange = (carPhotos) => setPhotos(carPhotos);

    const {carId} = useParams();

    const {userName} = useParams();

    useEffect(() => {
        if(carId > 0) {
            axios.get(`http://localhost:8081/v2/carphoto/${carId}`)
                .then(function (response) {
                    console.log(response.data);
                    onPhotosChange(response.data);
                })

        }
    },[carId]);

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

            <div className="car-info">
                <ImageList cols={1} sx={{ width: 1180, height: 860 }}>
                    {Array.from(Array(photos.length)).map((_, index) => (
                        <ImageListItem key={photos[index]?.photoUrl}>
                            <img
                                src={`${photos[index]?.photoUrl}?w=248&fit=crop&auto=format`}
                                srcSet={`${photos[index]?.photoUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>

                <Grid sx={{ width: 700, height: 380 }} container spacing={2} className="grid-car">
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>Brand</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>{photos[0]?.car?.brand}</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>Model</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>{photos[0]?.car?.model}</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>Body</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>{photos[0]?.car?.body}</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>Year of issue</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>{photos[0]?.car?.yearOfIssue}</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>Number of seats</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>{photos[0]?.car?.numberOfSeats}</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>Transmission</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>{photos[0]?.car?.transmission}</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>Price</label>
                    </Grid>
                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <label>{photos[0]?.car?.price}</label>
                    </Grid>

                    <Grid textAlign={"left"} item xs={6} md={6}>
                        <Button color='inherit'><NavLink to={`/rentcar/${carId}/${userName}`} className="car-button">Rent</NavLink></Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}