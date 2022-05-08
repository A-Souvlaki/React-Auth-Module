import React from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


import { useContext } from "react";
import AppContext from "../../../store/AppContext";

const AssignItem = ({ item, header}) => {


  const state = useContext(AppContext);


  return (
    <Grid item xs="auto">
      <TextField
          id="outlined-read-only-input"
          label={header}
          defaultValue={item}
          InputProps={{
            readOnly: true,
          }}
        /> 
    </Grid>
       

  )
}

export default AssignItem;