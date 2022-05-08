import React from 'react'
import Button from '@mui/material/Button';

function PatientButton(props) {
    const {text, size, color, variant, onClick, ...other} = props

    return (
        <Button
        sx={{ marginBottom:2, marginRight:2}}
        variant={variant || 'contained'}
        size={size || 'large'}
        color={color || 'primary'}
        onClick={onClick}  
        {...other}
        >
            {text}
        </Button>
    )
};

export default PatientButton
