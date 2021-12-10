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
import {Grid, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import {useParams} from "react-router";
import '../../css/Car.css'

export default function Car() {

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
                        <div className="login-button">
                            <Button color='inherit'><NavLink to="/signin" className="nav-link-button">Sign In</NavLink> </Button>
                            <Button color='inherit'><NavLink to="/signup" className="nav-link-button">Sign Up</NavLink></Button>
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
                                //title={item.title}
                                //subtitle={<span>by: {item.author}</span>}
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
                    <Grid item xs={6} md={6}>
                        <label>Model</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <label>{photos[0]?.car?.model}</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <label>Body</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <label>{photos[0]?.car?.body}</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <label>Year of issue</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <label>{photos[0]?.car?.yearOfIssue}</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <label>Number of seats</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <label>{photos[0]?.car?.numberOfSeats}</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <label>Transmission</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <label>{photos[0]?.car?.transmission}</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <label>Price</label>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <label>{photos[0]?.car?.price}</label>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}