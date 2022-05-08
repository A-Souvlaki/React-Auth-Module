import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';


const SelectAutoWidth = (props) => {

	const styles = theme => ({
		select: {
		  "&:before": {
			borderColor: "red"
		  }
		}
	  });

	  const classes = styles()

	const {name, label, value, onChange, options, section, error=null, canEdit } = props;

	const convertToDeEventPara = (e, name) =>({
		target :{
			...e.target,
			section,
			name
		}
	})

	return (

			<FormControl sx={{marginLeft:2, marginTop:1 ,width:'90%'}}
			{...(error && {error:true})}>
				
				<InputLabel>{label}</InputLabel>
				<Select 
				variant="outlined"
				readOnly={canEdit}
				name={name}
				value={value}
				label={label}
				onChange={(event) => onChange(convertToDeEventPara(event,name))}
				size="small"
				className={classes.select}>
					<MenuItem value=''>None</MenuItem>
					{options.map((option, index) =>{
						return(
							<MenuItem key={index} value={option.value}>{option.label}</MenuItem>
						)
					})}
				</Select>
				{error && <FormHelperText>{error}</FormHelperText>}
			</FormControl>
	);
};

export default SelectAutoWidth;
