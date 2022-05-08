import React, { useContext, useEffect } from 'react';
import './PatientContainer.css';
import axios from 'axios';
import AppContext from '../../../store/AppContext';
import PatientList from '../PatientList/PatientList';
import { useSelector } from "react-redux";

const TaskContainer = (props) => {
	const { handleOnclick } = props;
	const { user: currentUser } = useSelector((state) => state.auth);
	const state = useContext(AppContext);



	const loadIPS = async () => {
		try {

			const configurated = {
				headers: { Authorization: `Bearer ${currentUser.accessToken}` },
				
			};
			const response = await axios.get(
				'http://localhost:8080/crueapi/crue/get-all-ips', configurated
			);
			const ips = response.data;
			console.log(response.data)
			state.setIPS(ips);
		} catch (error) { }
	};

	useEffect(() => {
		loadIPS();
	}, []);

	return (
		<React.Fragment>
			<PatientList handleOnclick={handleOnclick} />
		</React.Fragment>
	);
};

export default TaskContainer;
