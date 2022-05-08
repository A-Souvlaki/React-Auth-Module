import React from 'react'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';

function FechaN(props) {
	const {name, value, label, onChange, edit, error=null, section} = props

	const convertToDeEventPara = (name, value) =>({
		target :{
			name,value,section
		}
	})

	const [text, setValue] = React.useState(value);

	console.log()

	const handleOnChange = (e, name) =>{
		const dateSQL = e.toISOString().slice(0, 19).replace('T', ' ')
		const format = dateSQL+".666"
		setValue( dateSQL)
		onChange(convertToDeEventPara(name, format))
	}

	return (
		<FormControl sx={{marginTop:2, marginLeft:2, width:'90%'}} {...(error && {error:true})}>
			<LocalizationProvider dateAdapter={AdapterDateFns} >
			<Stack  >
				{edit ? (
				<DatePicker
					label={label}
					readOnly
					value={value}
					onChange={(e) => {
						handleOnChange(e, name)
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
				) : (
				<DatePicker
					disableFuture
					name={name}
					label={label}
					value={text}
					onChange={(e) => {
					handleOnChange(e, name)
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
				)}
				
			</Stack>			
		</LocalizationProvider>
		{error && <FormHelperText sx={{marginLeft:2}}>{error}</FormHelperText>}
	  </ FormControl>
	)
};

export default FechaN
