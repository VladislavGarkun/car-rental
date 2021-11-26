import * as React from 'react';
import Box from '@mui/material/Box';

export default function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        color: 'white',
        p: 1,
        m: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}