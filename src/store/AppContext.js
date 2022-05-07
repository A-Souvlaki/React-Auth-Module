import React, { useState } from 'react';

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
	const [beds, setBeds] = useState([]);
	const [patientsHeaders, setPatientsHeaders] = useState([]);
	const [patients, setPatients] = useState([]);
	const [ipss, setIPS] = useState([]);
	const [config, setConfig] = useState([]);
	const [patientPDF, setPdf] = useState(null);
	const [dataTables, setDataTables] = useState([])

	const state = {
		beds,
		setBeds,
		patientsHeaders,
		setPatientsHeaders,
		patients,
		setPatients,
		ipss, 
		setIPS,
		config,
		setConfig,
		patientPDF,
		setPdf,
		dataTables,
		setDataTables
	};

	return (
		<AppContext.Provider value={state} displayName="AppContext">
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContext;
