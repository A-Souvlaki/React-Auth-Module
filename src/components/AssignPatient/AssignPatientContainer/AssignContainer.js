import React, { useContext, useEffect, useState } from "react";
import AssignGrid from "../AssignGrid/AssignGrid";
import AssignIPS from "../AssignIPS/AssignIPS";
import "./AssignContainer.css"
import AppContext from "../../../store/AppContext";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import ButtonSend from '../../AEVpatients/PatientButton/PatientButton'
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import { makeStyles } from '@mui/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Form } from '../../AEVpatients/UseForm/UseForm'
import { assign } from '../../../constants/initialValues'
import axios from 'axios'
import { useSelector } from "react-redux";



function AssignContainer({ patient, doctor, icurec_type }) {
    const state = useContext(AppContext);
    const { user: currentUser } = useSelector((state) => state.auth);



    const assignBed = async (values) => {
        try {

            const configurated = {
                headers: { Authorization: `Bearer ${currentUser.accessToken}` }
            };
            console.log(values)
            const response = await axios.post('http://localhost:8080/crueapi/crue/add-icurecord', values, configurated)
            console.log(response)
        } catch (error) { }
    };

    const clinics = state.ipss

    const toRender = {
        radicado: patient.Radicado,
        nombre: patient.Nombre
    }

    const renderPatient = () => {
        return (<AssignGrid key={toRender.radicado} data={toRender} />);
    }

    const renderDoctor = () => {
        return (<AssignGrid data={doctor} />);
    }

    const renderIpc = (ip) => {
        return (<AssignIPS key={ip.id} ips={ip} />);
    }

    const [open, setOpen] = React.useState(false);
    const [ips, setIps] = useState(null);
    const [date, setDate] = useState(null)

    const handleOpen = () => {
        const specificMoment = new Date(Date.now());
        const dateString = specificMoment.toDateString();
        setDate(dateString)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setIps(null)
    }


    const {
        values,
        setValues,
        handleInputChange,
        resetForm,
    } = useForm(assign)

    const convertToDeEventPara = (value, name, section) => ({
        target: {
            value,
            section,
            name
        },
    })

    const dataDirect1 = () => {
        setValues({
            ...values,
            1: {
                'personAssignName': currentUser.userUsername
            },
            2: {
                'patientId': patient.id,
            },
            3: {
                ...values[3],
                'icurecId': Math.random(),
                'icurecDate': new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ') + ".666"
            }
        })
    }


    useEffect(() => {
        dataDirect1()
    }, [])

    const style = {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translate(-50%, -40%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const useStyles = makeStyles({
        icon: {
            '&:hover': {
                color: "#0962DB"
            },

        },
    })

    const classes = useStyles();

    const handleSelect = (event, value, name) => {
        const ipsSelect = clinics.find(element => element.ipsName === value)
        setIps(ipsSelect)
        if (value !== null) {
            handleInputChange(convertToDeEventPara(ipsSelect.ipsId, 'ipsId', 0))
        }

    };

    const handleSelect2 = (event, value, name) => {
        handleInputChange(convertToDeEventPara(value, name, 3))
    };

    const handleSelect3 = (event, name) => {
        handleInputChange(convertToDeEventPara(event.target.value, name, 3))
    };

    const estateList = [
        { label: 'Asignado', value: 'Asignado' },
        { label: 'Rechazado', value: 'Rechazado' },
    ]

    const handleSubmit = e => {
        e.preventDefault()
        console.log('entros')
        assignBed(values)
        resetForm()
        window.alert("Paciente asignado")
        window.location.reload(false);

    }

    return (
        <Form onSubmit={handleSubmit}>

            <IconButton onClick={handleOpen}><AirlineSeatFlatIcon className={classes.icon} /></IconButton>
            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ maxHeight: 900, overflow: "auto" }}
            >

                <Box sx={style}>
                    <Box mt={2}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                            value={date}
                        />
                    </Box>
                    <Box mt={2}>
                        <Typography variant="h6" gutterBottom component="div">
                            Paciente
                        </Typography>
                        {renderPatient()}
                    </Box>
                    <Box mt={2}>
                        <Typography variant="h6" gutterBottom component="div">
                            IPS
                        </Typography>
                        <Autocomplete
                            onChange={(event, value) => handleSelect(event, value, 'ipsId')}
                            disablePortal
                            id="combo-box-demo"
                            options={clinics.map(ip => ip.ipsName)}
                            sx={{ width: 300, mb: 2 }}
                            renderInput={(params, index) =>
                                <TextField {...params}
                                    label="Buscar IPS"
                                />}
                        />
                        {ips != null ? (
                            renderIpc(ips)
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                    </Box>
                    <Box mt={2}>
                        <Typography variant="h6" gutterBottom >
                            Datos
                        </Typography>
                        <TextareaAutosize
                            maxRows={4}
                            onChange={(event, value) => handleSelect3(event, 'icurecDescription')}
                            aria-label="maximum height"
                            placeholder="Descripcion de la asignacion"
                            style={{ width: 700 }}
                        />
                        <Autocomplete
                            onChange={(event, value) => handleSelect2(event, value, 'icurecType')}
                            disablePortal
                            id="combo-box-demo"
                            options={estateList.map((item) => item.label)}
                            sx={{ width: 300, mt: 2 }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    label="Estado de la asignación"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />}
                        />
                    </Box>
                    <Box mt={2}>
                        <ButtonSend type={'submit'} text={"Guardar"} onClick={handleSubmit} />
                    </Box>
                </Box>
            </Modal>
        </Form>
    );
};

export default AssignContainer