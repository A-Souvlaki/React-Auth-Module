import React, { useState, useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import AssignPatient from '../../AssignPatient/AssignPatientContainer/AssignContainer';
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux";

import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import './PatientItem.css';
import axios from 'axios';

import { useContext } from 'react';
import AppContext from '../../../store/AppContext';


const Patient = (props) => {
	const { patient, handleOpen } = props;
	const { user: currentUser } = useSelector((state) => state.auth);

	const [item, setItem] = useState(null);



	const getPatient = async () => {
		try {

            const configurated = {
                headers: { Authorization: `Bearer ${currentUser.accessToken}` },
                responseType: "json"
            };
			const url =
				'http://localhost:8080/crueapi/crue/get-patient/' +
				patient.Radicado;
			const response = await axios.get(url, configurated);
			setItem(response.data);
		} catch (error) {}
	};

	useEffect(() => {
		getPatient();
	}, []);

	const useStyles = makeStyles({
		icon: {
			'&:hover': {
				color: '#0962DB',
			},
		},
	});

	const classes = useStyles();

	const [flag, setFlag] = React.useState(false);

	const state = useContext(AppContext);
	const keys = Object.keys(patient);

	const handleClick = () => {
		handleOpen(item);
	};

	const assignBed = () => {
		setFlag(true);
	};

	return (
		<React.Fragment>
			<TableRow className="bedItem">
				{keys.map((attribute, index) => {
					if (attribute !== 'id')
						return (
							<TableCell key={index}>
								{patient[attribute]}
							</TableCell>
						);
				})}
				<TableCell>
					<AssignPatient
						patient={patient}
						ipss={state.ipss}
					></AssignPatient>
					<IconButton onClick={handleClick}>
						<PersonIcon className={classes.icon} />
					</IconButton>
					<IconButton onClick={handleClick}>
						<AutoAwesomeMotionIcon
							
							className={classes.icon}
						/>
					</IconButton>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

export default Patient;
