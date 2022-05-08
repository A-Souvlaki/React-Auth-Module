import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RowRadioButtonsGroup(props) {
    const {options, name, value, onChange, section} = props

	const convertToDeEventPara = (e, name) =>({
		target :{
			...e.target,
			section,
			name
		}
	})

    return (
        <FormControl>
            <FormLabel sx={{marginLeft:2, marginTop:2}} component="legend">Servicio CRUE</FormLabel>
            <RadioGroup row
            sx={{marginLeft:2, width:'100%'}}
            name={name}
            value={value}
            onChange={(event) => onChange(convertToDeEventPara(event,name))}
            >
                {options.map((option, index) => {
                    return(
                        <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />
                    )
                })}
            </RadioGroup>
        </FormControl>
    );
};

export default RowRadioButtonsGroup
