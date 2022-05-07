import React, { useContext } from 'react'
import MyCard from '../Card/MyCard'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import ElderlyIcon from '@mui/icons-material/Elderly';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import CribIcon from '@mui/icons-material/Crib';
import { Grid, Paper, TableCell, TableRow } from '@mui/material';
//import ActionButton from '../AEVpatients/PatientActionButton/PatientActionButton'
import UseTable from '../UseTable/UseTable'
import { TableBody } from '@mui/material';
import download from 'downloadjs'
import axios from 'axios'
//import AuthContext from '../../context/auth'
import { Button } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";




const headCells = [
    { id: 'radicado', label: ' Radicado N.' },
    { id: 'nombre', label: ' Nombre Paciente' },
    { id: 'fecha', label: ' Fecha de Creación' },
    { id: 'edad', label: ' Edad Paciente' },
    { id: 'estado', label: ' Estado' },
    { id: 'puntaje', label: ' Puntaje' },
]

function DashboardContainer (props)  {
    const { data, recoPatients } = props
    
    const { user: currentUser } = useSelector((state) => state.auth);

    const configurated = {
        headers: { Authorization: `Bearer ${currentUser.accessToken}` },
        responseType: "json"
    };

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging
    } = UseTable(recoPatients, headCells);

    console.log(recoPatients)
    const downloadReport = async () => {
        try {
            await axios.get(
                "http://localhost:8080/crueapi/crue/dashboard/export/pdf", configurated
            )
                .then(
                    response => {
                        const content = response.headers['content-type'];
                        download(response.data, 'Reporte_diario', content)

                    });
        } catch (error) {
            console.log(error)
        }
    };



    return (
       
        <Paper sx={{ width: '100%', margin: 'auto', marginTop: 3 }}>

            <Typography variant="h5"  align='center' sx={{marginTop:5 }} style={{ flexGrow: 1 }}>
              Información General
            </Typography >
            < Grid container>
                <Grid item xs={4}>
                    <MyCard title='Pacientes por verificar' data={data.numPatientxVerify}>
                        < HealthAndSafetyIcon sx={{ color: '#47929c', height: '100%', width: '100%' }} />
                    </MyCard>
                    <MyCard title='Camas UCI Adultos ' data={data.numIcuAdultBeds}>
                        < ElderlyIcon sx={{ color: '#47929c', height: '100%', width: '100%' }} />
                    </MyCard>
                </Grid>
                <Grid item xs={4}>
                    <MyCard title='Pacientes en lista de espera' data={data.numPatientWaiting}>
                        < MedicalServicesIcon sx={{ color: '#47929c', height: '100%', width: '100%' }} />
                    </MyCard>
                    <MyCard title='Camas UCI Pediatricos ' data={data.numIcuPedBeds}>
                        < ChildCareIcon sx={{ color: '#47929c', height: '100%', width: '100%' }} />
                    </MyCard>
                </Grid>
                <Grid item xs={4}>
                    <MyCard title='Pacientes trasladados' data={data.numPatientTralasted}>
                        < AirportShuttleIcon sx={{ color: '#47929c', height: '100%', width: '100%' }} />
                    </MyCard>
                    <MyCard title='Camas UCI NeoNatos ' data={data.numIcuNeoBeds}>
                        < CribIcon sx={{ color: '#47929c', height: '100%', width: '100%' }} />
                    </MyCard>
                </Grid>
            </Grid>
            <div align="center">
                <Button variant="dark" onClick={downloadReport} >Reporte</Button>{' '}
            </div>
            <TblContainer>
                <TblHead />
                
                <TableBody>
                    {
                        recordsAfterPaging().map(item => (
                            <TableRow key={item.id}>
                                <TableCell align='center'>{item.Radicado}</TableCell>
                                <TableCell>{item.Nombre}</TableCell>
                                <TableCell>{item.Fecha}</TableCell>
                                <TableCell>{item.Edad}</TableCell>
                                <TableCell>{item.Estado}</TableCell>
                                <TableCell>{item.Puntaje}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>

            </TblContainer>

            <TblPagination />

        </Paper>



    )
};
export default DashboardContainer;
