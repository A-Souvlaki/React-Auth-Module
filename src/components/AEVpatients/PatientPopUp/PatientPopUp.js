import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import CloseIcon from '@mui/icons-material/Close';
import PatientActionButton from '../PatientActionButton/PatientActionButton'
import  { Typography }  from '@mui/material'


function PatientPopUp(props) {
    const {title, children, openPopup, setOpenPopup} = props;

    return (
        <Dialog open={openPopup}>
            <DialogTitle>
                <div style={{display:'flex'}}>
                    <Typography variant="h5" align='center' gutterBottom component="div" style={{ flexGrow: 1 }}>
                    {title}
                    </Typography>
                    <PatientActionButton                      
                        color='secondary'  
                        onClick={() => setOpenPopup(false)}               
                    >
                        <CloseIcon />
                    </PatientActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
};

export default PatientPopUp
