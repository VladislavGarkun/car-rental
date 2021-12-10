import React from 'react';

export default function Foto(props){
    return <img src = {`${props.photoUrl}`} alt = 'car foto' height={'100%'} width={'100%'}/>
}