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
import Item from "../../base/item/Item";
import {Grid} from "@mui/material";
import CarInfo from '../car/CarInfo';

export default function ButtonAppBar() {

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
                //alert(response.data.length)
                onCarsChange(response.data)
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
            <div className="login-button">
              <Button color='inherit'><NavLink to="/signin" className="nav-link-button">Sign In</NavLink> </Button>
              <Button color='inherit'><NavLink to="/signup" className="nav-link-button">Sign Up</NavLink></Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="grid-car">
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Array.from(Array(cars.length)).map((_, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                      <Item sx><CarInfo carInfo = {cars[index]}/></Item>
                  </Grid>
              ))}
          </Grid>
      </div>

    </>
  );
}