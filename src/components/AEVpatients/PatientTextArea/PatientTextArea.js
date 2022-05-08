import React, {useState} from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function PatientTextArea(props) {
    const {onChange,name, flag, value, error, helper, section, required} = props;

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
        <TextareaAutosize 
            required={required}
            name={name}
            value={text}
            InputProps={{
                readOnly: flag,
              }}
            maxRows={4}
            placeholder={helper}
            onChange={(e) =>{handleChange(e,name)}}
            style={{ width: 700 }}
        />
    )
}


export default PatientTextArea

