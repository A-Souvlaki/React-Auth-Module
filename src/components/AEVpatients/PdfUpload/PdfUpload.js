import React, {useEffect} from "react";
import "./PdfUpload.css";
import { useContext, useState } from "react";
import AppContext from "../../../store/AppContext";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const PdfUpload = () => {
    const state = useContext(AppContext);

    const [file, setFile] = useState(null);

    
    const Input = styled('input')({
        display: 'none',
    });

   

    const uploadFiles = (event) => {
        setFile(event.target.files);
        state.setPdf(event.target.files)
    }

    const style = {
        width: 400,
    };

    useEffect(() => {
        
    }, [])

    return (

        <Box className="pdfUpload" sx={style}>
            <div className="buttonUpload">
                <label htmlFor="contained-button-file">
                    <Input accept="application/pdf" id="contained-button-file" type="file" onChange={(event)=>uploadFiles(event)}/>
                    <Button variant="outlined" component="span">
                        Subir archivo
                    </Button>
                </label>
            </div>
            <div className="textField">
                {file ? (
                    <TextField
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="standard"
                    value={file[0].name} 
                />
                ) : (
                    <TextField  
                    InputProps={{
                        readOnly: true,
                    }}
                    defaultValue=""
                    variant="standard"
                />
                )}
                
            </div>
        </Box>
    );

};

export default PdfUpload;