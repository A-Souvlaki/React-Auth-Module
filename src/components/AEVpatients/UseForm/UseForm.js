import React, { useState, useEffect } from 'react'

export function useForm(initialFValues) {


    const [values, setValues] = useState(initialFValues)
    const [errors, setErrors] = useState({})
    
    const handleInputChange = (e) => {
		const {name, value, section} = e.target
        if(section === 4){
            const valuetables = values[4].valuetables.map((object) =>{
                if(object.itemName === name){
                    return {
                        ...object,
                        valueText:value,
                    }
                }
                return object
            })
            setValues({
                ...values,
                [section]:{
                    valuetables
                }
            })  
        }else{
            setValues({
                ...values,
                [section]:{
                    ...values[section],
                    [name]:value
                }
            })
        }
	}

    const resetForm = () =>{
        setValues(initialFValues)
        setErrors({})
    }

    return {
        values, 
        setValues,
        handleInputChange,
        errors,
        setErrors,
        resetForm,
    }
}


export  function Form(props) {
    const {children,...other} = props;

    return (
        <form  autoComplete='off' {...other}>
            {props.children}
        </form>
    )
}
