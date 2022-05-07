import './App.css';
import React from 'react';
import { AppContextWrapper } from './store/AppContext';
import DashboardContext from './context/Dashboard/Provider'
//import AuthContext from './context/auth/Provider'
import Routing from './config/Routes';
import MongoContext from './context/Mongo/Provider'
import DataTableContext from './context/Datatables/Provider'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	return (
		<AppContextWrapper>		
		
      <DataTableContext>
			<MongoContext>
			<DashboardContext>
			 <Routing />

			</DashboardContext>
			</MongoContext>
			</DataTableContext>
			
		</AppContextWrapper>
	);
}

export default App;
