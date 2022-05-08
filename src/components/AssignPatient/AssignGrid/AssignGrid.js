import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AssignItem from "../AssignItem/AssignItem"

import "./AssignGrid.css"
import { useContext } from "react";
import AppContext from "../../../store/AppContext";


function ResponsiveGrid({data}) {
  const state = useContext(AppContext);
  const keys =Object.keys(data);

  return (
    <Box sx={{ flexGrow: 1 }} className="boxGrid">
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {keys.map((attribute, index) => {
        return (
          <AssignItem 
            key={index}
            item={data[attribute]}
            header={attribute}
          />
        );
      })}
      </Grid>
    </Box>
  );
};

export default ResponsiveGrid
