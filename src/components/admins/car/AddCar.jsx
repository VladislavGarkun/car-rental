import {useNavigate, useParams} from "react-router";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { NavLink } from "react-router-dom";
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { TextField } from "@mui/material"
import Button from '@mui/material/Button';
import axios from "axios";
import * as React from "react";

export default function() {

    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        const photos = value.split('\n');
        for(let i = 0; i < photos.length; i++)
            console.log(photos[i])
    };

    const [carData, setCarData] = useState({
        carData: {
            brand: '',
            model: '',
            body: '',
            yearOfIssue: '',
            numberOfSeats: '',
            transmission: '',
            price: '',
            status: ''
        }
    })

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {userName} = useParams();

    const [errorLabel, setErrorLabel] = useState('');
    const onErrorLabelChange = (message) => setErrorLabel(message);

    const navigate = useNavigate();

    function addCar() {
        axios.post("http://localhost:8081/v2/car", {
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
                onErrorLabelChange(error.response.data.mess);
            });
    }

    function handle(e) {
        const newData = {...carData}
        newData[e.target.id] = e.target.value
        setCarData(newData)
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
                            <MenuItem><NavLink to={`/adminprofile/${userName}`} className="nav-link-user">Profile</NavLink></MenuItem>
                            <MenuItem><NavLink to={`/admin/orders/${userName}`} className="nav-link-user">Orders</NavLink></MenuItem>
                            <MenuItem><NavLink to="/" className="nav-link-user">Logout</NavLink></MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

            <div className = 'profile-info'>
                <TextField
                    value={carData.brand}
                    id="brand"
                    onChange={(e) => handle(e)}
                    margin="normal"
                    size="string"
                    required
                    label="Brand"
                    placeholder="Brand"
                />
                <TextField
                    value={carData.model}
                    id="model"
                    onChange={(e) => handle(e)}
                    margin="normal"
                    size="string"
                    required
                    label="Model"
                    placeholder="Model"
                />
                <TextField
                    value={carData.body}
                    id="body"
                    onChange={(e) => handle(e)}
                    margin= "normal"
                    required
                    label="Body"
                    placeholder="Body"
                />
                <TextField
                    value={carData.yearOfIssue}
                    id="yearOfIssue"
                    onChange={(e) => handle(e)}
                    margin= "normal"
                    required
                    label="Year of issue"
                    placeholder="Year of issue"
                />
                <TextField
                    value={carData.numberOfSeats}
                    id="numberOfSeats"
                    onChange={(e) => handle(e)}
                    margin= "normal"
                    required
                    label="Number of seats"
                    placeholder="Number of seats"
                />
                <TextField
                    value={carData.transmission}
                    id="transmission"
                    onChange={(e) => handle(e)}
                    margin= "normal"
                    required
                    label="Transmission"
                    placeholder="Transmission"
                />
                <TextField
                    value={carData.price}
                    id="price"
                    onChange={(e) => handle(e)}
                    margin= "normal"
                    required
                    label="Price"
                    placeholder="Price"
                />
                <TextField
                    value={carData.status}
                    id="status"
                    onChange={(e) => handle(e)}
                    margin= "normal"
                    required
                    label="Status"
                    placeholder="Status"
                />
                <TextField
                    id="carPhotos"
                    label="Car Photo"
                    multiline
                    maxRows={4}
                    value={value}
                    onChange={handleChange}
                />
                <Button onClick={addCar}><label className="car-button">Add</label></Button>
                <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
                    {errorLabel}
                </Typography>
            </div>

        </Box>
    );
}