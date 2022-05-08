import * as React from 'react';
import './PatientsTabPanel.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PatientTextField from "../PatientTextField/PatientTextField"
import PatientTextArea from "../PatientTextArea/PatientTextArea"

function PatientsTabPanel(props) {
	const { config, onChange, values} = props;

	
	const [value, setValue] = React.useState('1');

	const handleChange = (event, newValue) => {
	  setValue(newValue);
	};


	const findValues = (name) =>{
		var valueString = ''
		values.map((object) =>{
			if(object.itemName === name){
				valueString =object.valueText
			}
		})
		return valueString
	}


  
	return (
	  <Box sx={{ width: '100%', typography: 'body1' }}>
		<TabContext value={value} variant="scrollable">
		  <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
			<TabList onChange={handleChange} aria-label="lab API tabs example">
				{config.map((option, index) =>{
					return(
						<Tab key={index} label={option.label} value={option.secId}/>
					)
					
				})}			
			</TabList>
		  </Box>
		    {config.map((option, index) =>{
				return(
					<TabPanel key={index} value={option.secId}>
						{option.items.map((item, index) =>{
							if(item.typee === "TextField"){
								return(
									<PatientTextField key={index} flag={item.itemModfiable} canEdit={item.itemModfiable} name={item.name} value={findValues(item.name)} label={item.label }  helper={item.helper} section={4} onChange={onChange}/>
								)
							}else if (item.typee === 'TextArea'){
								return(
									<PatientTextArea key={index} flag={item.itemModfiable} canEdit={item.itemModfiable} name={item.name} value={findValues(item.name)} label={item.label }  helper={item.helper} section={4} onChange={onChange}/>
								)
							}
						})}
					</TabPanel>
				)
			})}	
		</TabContext>
	  </Box>
	);
}

export default PatientsTabPanel