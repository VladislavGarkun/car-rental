import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Foto from "../../base/foto/Foto";
import {NavLink} from "react-router-dom";
import '../../css/Home.css'

export default function UserCarInfo(props) {

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

    useEffect(() => {
        if(props?.carInfo?.id > 0) {
            axios.get(`http://localhost:8081/v2/carphoto/${props?.carInfo?.id}`)
                .then(function (response) {
                    console.log(response.data);
                    onPhotosChange(response.data);
                })

        }
    },[props.carInfo]);

    return(
        <>
            <NavLink to ={`/usercar/${props?.carInfo?.id}/${props?.userName}`}><Foto photoUrl = {photos[0]?.photoUrl} /></NavLink>
            <NavLink to = {`/usercar/${props?.carInfo?.id}/${props?.userName}`} className="nav-link-cars">{`${props?.carInfo?.brand} ${props?.carInfo?.model}`}</NavLink>
        </>
    );
}