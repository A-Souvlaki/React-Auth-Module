import React, { useState } from 'react';
import './PatientTextField.css';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';



const TextFieldFormItem = ( props) => {

	

	const {onChange,name, flag, value, label, error=null, helper, section, canEdit} = props;

	const [helperT, setHelperText] = useState(helper)
	const [text, setValue] = useState(value)


	const convertToDeEventPara = (e, name) =>({
		target :{
			...e.target,
			section,
			name
		}
	})

	const handleChange = (e, name) =>{
		setValue(e.target.value)
		onChange(convertToDeEventPara(e, name))
	}

	return (
		<>
			{flag ? (
				<TextField 
				sx={{marginLeft:2,marginTop:2 ,width:'60%'}}
				variant="outlined"
				label={label}
				name={name}
				value={value}
				InputProps={{
				  readOnly: canEdit,
				}}
				size="small" 
				/>
			): (
				<TextField
				sx={{marginLeft:2, marginTop:2 ,width:'60%'}}
				variant="outlined"
				onChange={(e) =>{handleChange(e,name)}}
				name={name}
				label ={label}
				value= {text}
				size="small" 
				helperText={helperT}
				{...(error && {error:true, helperText:error})}
				/>
			)}
		</>	
	);
};
export default TextFieldFormItem;
