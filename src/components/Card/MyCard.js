import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function MyCard (props) {
    const {title, data, children} = props

  return (
    <Card sx={{ minWidth: 250, margin:5, height:100 }}>
      <CardContent sx={{ display:'flex'}}>
        <Box sx={{width: 75}}>
            {children}
        </Box>
        <Box sx={{width: 175, textAlign: 'center'}}>   
            <Typography sx={{ fontSize: 16 }} color="text.secondary" >
               {title}
            </Typography>
            <Typography sx={{ fontSize: 24 }} color="text.secondary" >
               {data}
            </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyCard