import React, { useState, useEffect, useContext } from 'react';
import './PatientForm.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import PatientTextField from "../PatientTextField/PatientTextField"
import RowRadioButtonsGroup from '../RowRadioButtonsGroup/RowRadioButtonsGroup';
import PatientSelects from "../PatientSelects/PatientSelects"
import PatientsTabPanel from "../PatientsTabPanel/PatientsTabPanel"
import PdfUpload from "../PdfUpload/PdfUpload"
import AssignIPS from "../../AssignPatient/AssignIPS/AssignIPS";

import PatientDatePicker from "../PatientDatePicker/PatientDatePicker"
import { initialFValues } from "../../../constants/initialValues"
import { useForm, Form } from '../UseForm/UseForm';
import AppContext from "../../../store/AppContext";
import MongoContext from '../../../context/Mongo'
import { Button } from 'react-bootstrap';



const options = [
	{id:'1',value:"contraremision", label:"Contraremisión", list:[{type:"TextField", flag:false, name:"prueba", value:'prueba', label:'prueba', error:'prueba', helper:'prueba' }] },
	{id:'2',value:"atencion-inicial-urgencias", label:"Atención inicial urgencias", list:[{type:"TextField", flag:false, name:"prueba", value:'prueba', label:'prueba', error:'prueba', helper:'prueba' }] },
	{id:'3',value:"solicitud-de-servicios", label:"Solicitud de servicios", list:[{type:"TextField", flag:false, name:"prueba", value:'prueba', label:'prueba', error:'prueba', helper:'prueba'}] },
	{id:'4',value:"orientacion", label:"Orientación", list:[{type:"TextField", flag:false, name:"prueba", value:'prueba', label:'prueba', error:'prueba', helper:'prueba'}] },
	{id:'5',value:"otro", label:"Otro", list:[{type:"TextField", flag:false, name:"prueba", value:'prueba', label:'prueba', error:'prueba', helper:'prueba'}] }
]

const typeId = [
	{label:'AS', value:'AS'},
	{label:'CC', value:'CC'},
	{label:'CE', value:'CE'},
	{label:'MS', value:'MS'},
	{label:'NU', value:'NU'},
	{label:'PA', value:'PA'},
	{label:'RC', value:'RC'},
	{label:'TI', value:'TI'},
	{label:'PE', value:'PE'},
]

const PatientsForm = (props) => {
	const {addOrEdit, patient } = props;
	const {postMongo} = useContext(MongoContext)


	const state = useContext(AppContext);
	const clinics = state.ipss

	var formValues = initialFValues
	formValues = {
		...formValues,
		4:state.dataTables
	}


	const [ips, setIps] = useState(null);
	const [idAction, setIdAction] = useState(0);

	const renderIpc = (ip) => {
		return (<AssignIPS key={ip.id} ips={ip}/>);
	}

	const convertToDeEventPara = (value, name, section) =>({
		target :{
			value,
			section,
			name
		}
	})

	const handleSelect = (event, value) => {
		if(value !== null){
			const ipsSelect = clinics.find( element => element.ipsName === value)
			setIps(ipsSelect)
			handleInputChange(convertToDeEventPara(ipsSelect.ipsId, 'ipsId', 0))
		}
	};  

	const validate = () =>{
		let temp = {}
		temp.perFirstname = values[3].perFirstname?'':'This field is required'
		temp.perFirstlastname = values[3].perFirstlastname?'':'This field is required'
		temp.perFirstlastname = values[3].perFirstlastname?'':'This field is required'
		temp.perDocument = values[3].perDocument.length === 10?'':'This field need 10 caracters, has: ' + values[3].perDocument.length 
		temp.perDocumenttype = values[3].perDocumenttype?'':'This field is required'
		temp.perBirthdate = values[3].perBirthdate?'':'This field is required'
		temp.perDateofadmission = values[3].perDateofadmission?'':'This field is required'
		setErrors({
			...temp
		})

		return Object.values(temp).every(x => x === "" )
	}
	
	const{ 
		values,
		setValues,
		handleInputChange,
		errors,
		setErrors,
		resetForm,
 	} = useForm(formValues)

	const [edit, setRead] = useState(false)



	const setViewValues = () => {
		if(patient != null){
			//postMongo( 'Consult', patient[2].perDoc, '',patient[3].preRadicado )
			setRead(true)
			setIdAction(1)
			setValues({
				...patient
			})
			
		}
	}

	const radicado = () =>{	
		handleInputChange(convertToDeEventPara(Math.random(),'preRadicado', 3))
	}

	const handleSubmit = e =>{
		e.preventDefault()
		if(validate()){
			console.log('entro')
			addOrEdit(values, resetForm,idAction)	
		}
			
			
	}

	useEffect(() => {
		
		radicado()
		setViewValues()
	}, [])

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				
					<PatientTextField flag={edit} name={"perFirstname"} canEdit={false} value={values[3].perFirstname} label={"Primer nombre" } error={errors.perFirstname} helper={"Nombre del paciente"}  onChange={handleInputChange}></PatientTextField>
					<PatientTextField flag={edit} name={"perFirstlastname"} canEdit={false} value={values[3].perFirstlastname} label={"Primer apellido" } error={errors.perFirstlastname} helper={"Primer apellido del paciente"} section={3} onChange={handleInputChange}></PatientTextField>
					<PatientTextField flag={edit} name={"perDocument"} canEdit={false} value={values[3].perDocument} label={"Número Documento" } error={errors.perDocument} helper={"Número del paciente"} section={3} onChange={handleInputChange}></PatientTextField>
					
			
		
					<PatientTextField flag={edit} name={"perSecondname"} canEdit={false} value={values[3].perSecondname} label={"Segundo nombre" }  helper={"Segundo nombre del paciente"} required={false} section={3} onChange={handleInputChange}></PatientTextField>
					<PatientTextField flag={edit} name={"perSecondlasname"} canEdit={false} value={values[3].perSecondlasname} label={"Segundo apellido" } helper={"Segundo apellido del paciente"} required={false} section={3} onChange={handleInputChange}></PatientTextField>
					<PatientSelects name={"perDocumenttype"} label={"Tipo Id"} canEdit={edit} value={values[3].perDocumenttype} options={typeId} error={errors.perDocumenttype} section={3} onChange={handleInputChange}></PatientSelects>				
		
			
					<PatientDatePicker name={"perBirthdate"} value={values[3].perBirthdate} label={"Fecha de Nacimiento"} error={errors.perBirthdate} section={3} onChange={handleInputChange} edit={edit}/>
			
			
					<PatientDatePicker name={"perDateofadmission"} value={values[3].perDateofadmission} label={"Fecha de Admisión"} error={errors.perDateofadmission} section={3} onChange={handleInputChange} edit={edit}/>
			
				<Divider />
				<Grid item xs={12}>
					<RowRadioButtonsGroup options={options} name={"servicioCrue"} value={values[3].servicioCrue} section={3} onChange={handleInputChange}></RowRadioButtonsGroup>
				</Grid>
				<Divider />
				{edit ? (
					<React.Fragment></React.Fragment>
				) : (
					<Grid item xs={12} sx={{marginLeft:2, marginTop:2}}>
						<Typography variant="h6" gutterBottom component="div">
							  IPS
						</Typography>
						<Autocomplete  
						  onChange={(event, value) => handleSelect(event, value)}   
						  disablePortal			 
						  id="combo-box-demo"
						  options={clinics.map(ip => ip.ipsName )}
						  sx={{ width: 300, mb: 2 }}
						  renderInput={(params, index) => 
							<TextField {...params} 
							  label="Seleccionar IPS" 
							/>}
						/>
						  {ips != null ? (
							renderIpc(ips)
						  ) : (
							<React.Fragment></React.Fragment>
						  )}  
					</Grid>
				)}

				<Divider />
				<Grid item xs={12} sx={{marginTop:2}}>
					<PatientsTabPanel config={state.config} values={values[4].valuetables} onChange={handleInputChange}></PatientsTabPanel>
				</Grid>
				<Divider />
				<Grid item xs={12}>
					<PdfUpload />
				</Grid>
				
				
				
			</Grid>

			<div align="center" >
					<Button  class="mr-2" variant="dark" type="submit">Guardar</Button>
				</div>
		</Form>
	);
};

export default PatientsForm;
