import React, { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./PatientsView.css"
import PatientsContainer from "../components/PatientComponent/PatientContainer/PatientContainer"
import Container from '@mui/material/Container';
import axios from "axios";
import AppContext from "../store/AppContext";
import PatientPopUp from '../components/AEVpatients/PatientPopUp/PatientPopUp';
import AddIcon from '@mui/icons-material/Add';
import PatientForm from '../components/AEVpatients/PatientForm/PatientForm'
import Paper from '@mui/material/Paper'
import MongoContext from '../context/Mongo'
import { Button } from 'react-bootstrap';
import { useSelector } from "react-redux";




const PatientsView = () => {
    const state = useContext(AppContext);
    const { postMongo } = useContext(MongoContext)
    const { user: currentUser } = useSelector((state) => state.auth);

    const [openPopUp, setOpen] = useState(false)
    const [patientRecord, setPatientRecord] = useState(null);


    const load = async (values) => {
        try {


            const configurated = {
                headers: { Authorization: `Bearer ${currentUser.accessToken}` }
            };
            const response = await axios.post('http://localhost:8080/crueapi/crue/add-patient', Object.values(values), configurated)
                .then(
                    loadPDF(values[3].preRadicado)
                )
            console.log(response)
        } catch (error) { }
    };

    const loadEdit = async (values) => {
        try {
            const configurated = {
                headers: { Authorization: `Bearer ${currentUser.accessToken}` }
            };
            const url = 'http://localhost:8080/crueapi/crue/edit/' + values[3].preRadicado
            const response = await axios.put(url, Object.values(values), configurated)
            console.log(response)
        } catch (error) { }
    };

    const loadFormConfig = async () => {
        try {
            const configurated = {
                headers: { Authorization: `Bearer ${currentUser.accessToken}` }
            };
            const response = await axios.get(
                "http://localhost:8080/crueapi/config/build-interface", configurated
            );
            const config = response.data;
            state.setConfig(config);
        } catch (error) { }
    };

    const loadDataTableJson = async () => {
        try {
            const configurated = {
                headers: { Authorization: `Bearer ${currentUser.accessToken}` }
            };
            const response = await axios.get(
                "http://localhost:8080/crueapi/config/get-valuetables-initial-values", configurated
            );
            console.log(response.data)
            state.setDataTables(response.data)
        } catch (error) { }
    };

    const loadPDF = async (patient_rad) => {
        try {
            if (state.patientPDF != null) {
                const formData = new FormData();
                formData.append('file', state.patientPDF[0])
                console.log(state.patientPDF[0])
                const configForPdf = {
                    headers: {
                        Authorization: `Bearer ${currentUser.accessToken}`,
                        'Content-Type': `multipart/form-data`
                    }
                };
                const response = await axios.post(
                    "http://localhost:8080/crueapi/crue/add-patient/cHistory/" + patient_rad, formData, configForPdf
                );
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const loadPatients = async () => {
        try {
            const configurated = {
                headers: { Authorization: `Bearer ${currentUser.accessToken}` },
                responseType: "json"
            };
            const response = await axios.get(
                "http://localhost:8080/crueapi/crue/get-patients", configurated
            );

            const patients = response.data;
            const headers = [];
            for (var key in patients[0]) {
                headers.push(key);
            }
            state.setPatients(patients);
            state.setPatientsHeaders(headers);
        } catch (error) { }
    };

    useEffect(() => {
        loadPatients();
        loadFormConfig();
        loadDataTableJson();
    }, []);

    const addOrEdit = (patient, resetForm, idAction) => {
        if (idAction === 0) {
            window.alert("Paciente agregado")
            //postMongo('Register', patient[2].perDoc, '',patient[3].preRadicado)
            load(patient)
            window.location.reload(false);
        } else {
            window.alert("Paciente editado")
            postMongo('Edit', patient[2].perDoc, '', patient[3].preRadicado)
            loadEdit(patient)
            window.location.reload(false);
        }

        resetForm()

        setOpen(false)
    }

    const openPopUpEdit = (item) => {
        setPatientRecord(item)
        setOpen(true)
    }

    const handleRegistrar = () => {
        setPatientRecord(null)
        setOpen(true)
    }

    return (
        <Container className="patientsView">
            <Box>
                <Box display='flex'>
                    <Typography variant="h5" align="center  " gutterBottom component="div" sx={{ marginTop: 5 }} style={{ flexGrow: 1 }}>
                        Pacientes
                    </Typography >
                </Box>

                <Paper >
                    <PatientsContainer handleOnclick={openPopUpEdit}></PatientsContainer>
                    <PatientPopUp
                        openPopup={openPopUp}
                        setOpenPopup={setOpen}
                        title={'Formulario Pacientes'}
                    >
                        <PatientForm addOrEdit={addOrEdit} patient={patientRecord}></PatientForm>
                    </PatientPopUp>
                </Paper>
            </Box>

            <div style={{ marginTop: '20px' }}>
                <Button variant="dark" onClick={handleRegistrar} >Agregar Paciente</Button>{' '}
            </div>

        </ Container>
    );
};

export default PatientsView;