import * as React from 'react';
import Box from '@mui/material/Box';

export default function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
            height: 350,
            width: 620,
            color: 'white',
            background: 'white',
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: '700',
            ...sx,
          }}
          {...other}
        />
    );
}