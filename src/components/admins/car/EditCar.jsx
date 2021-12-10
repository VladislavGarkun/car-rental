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
import {Grid, ImageList, ImageListItem, ImageListItemBar, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router";
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

    const [carData, setCarData] = useState({
        id: '',
        brand: '',
        model: '',
        body: '',
        yearOfIssue: '',
        numberOfSeats: '',
        transmission: '',
        price: '',
        status: ''
    })

    function handle(e) {
        const newData = {...carData}
        newData[e.target.id] = e.target.value
        setCarData(newData)
    }

    const {carId} = useParams();

    const {userName} = useParams();

    useEffect(() => {
        if(carId > 0) {
            axios.get(`http://localhost:8081/v2/carphoto/${carId}`)
                .then(function (response) {
                    console.log(response.data);
                    setPhotos(response.data);
                })
            axios.get(`http://localhost:8081/v2/car/${carId}`)
                .then(function (response) {
                    console.log(response.data);
                    setCarData(response.data);
                })

        }
    },[carId]);

    const navigate = useNavigate();

    function saveEdit() {
        axios.put("http://localhost:8081/v2/car", {
            id: carData.id,
            brand: carData.brand,
            model: carData.model,
            body: carData.body,
            yearOfIssue: carData.yearOfIssue,
            numberOfSeats: carData.numberOfSeats,
            transmission: carData.transmission,
            price: carData.price,
            status: carData.status
        })
            .then(function (response) {
                console.log(response);
                navigate(`/adminhome/${userName}`)
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
                                <MenuItem><NavLink to={`/adminhome/${userName}`} className="nav-link-user">Home</NavLink></MenuItem>
                                <MenuItem><NavLink to={`/adminprofile/${userName}`} className="nav-link-user">Profile</NavLink></MenuItem>
                                <MenuItem><NavLink to={`/admin/orders/${userName}`} className="nav-link-user">Orders</NavLink></MenuItem>
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
                                //alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>

                <div className = 'edit-car-info'>
                    <TextField
                        value={carData?.brand}
                        id="brand"
                        onChange={(e) => handle(e)}
                        margin="normal"
                        size="string"
                        required
                        label="Brand"
                        placeholder="Brand"
                    />
                    <TextField
                        value={carData?.model}
                        id="model"
                        onChange={(e) => handle(e)}
                        margin="normal"
                        size="string"
                        required
                        label="Model"
                        placeholder="Model"
                    />
                    <TextField
                        value={carData?.body}
                        id="body"
                        onChange={(e) => handle(e)}
                        margin= "normal"
                        required
                        label="Body"
                        placeholder="Body"
                    />
                    <TextField
                        value={carData?.yearOfIssue}
                        id="yearOfIssue"
                        onChange={(e) => handle(e)}
                        margin= "normal"
                        required
                        label="Year of issue"
                        placeholder="Year of issue"
                    />
                    <TextField
                        value={carData?.numberOfSeats}
                        id="numberOfSeats"
                        onChange={(e) => handle(e)}
                        margin= "normal"
                        required
                        label="Number of seats"
                        placeholder="Number of seats"
                    />
                    <TextField
                        value={carData?.transmission}
                        id="transmission"
                        onChange={(e) => handle(e)}
                        margin= "normal"
                        required
                        label="Transmission"
                        placeholder="Transmission"
                    />
                    <TextField
                        value={carData?.price}
                        id="price"
                        onChange={(e) => handle(e)}
                        margin= "normal"
                        required
                        label="Price"
                        placeholder="Price"
                    />
                    <TextField
                        value={carData?.status}
                        id="status"
                        onChange={(e) => handle(e)}
                        margin= "normal"
                        required
                        label="Status"
                        placeholder="Status"
                    />
                    {/*<TextField*/}
                    {/*    id="carPhotos"*/}
                    {/*    label="Car Photo"*/}
                    {/*    multiline*/}
                    {/*    maxRows={4}*/}
                    {/*    value={value}*/}
                    {/*    onChange={handleChange}*/}
                    {/*/>*/}

                    <Button onClick={saveEdit}><label className="car-button">Save</label></Button>
                </div>

            </div>
        </>
    );
}