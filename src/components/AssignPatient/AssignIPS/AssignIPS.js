import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useContext } from 'react';
import { styled } from '@mui/material/styles';
import AppContext from '../../../store/AppContext';

const AssignIPS = ({ ips }) => {
	const state = useContext(AppContext);

	const [open, setOpen] = React.useState(false);
	const keys = Object.keys(ips);

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: '#E1E1E1',
		},
	}));

	return (
		<React.Fragment>
			<Table sx={{ width: '100%', overflow: 'hidden' }}>
				<TableHead className="header">
					<TableRow>
						<StyledTableCell>
							<b></b>
						</StyledTableCell>
						<StyledTableCell className="header-row">
							<b>Nombre</b>
						</StyledTableCell>
						<StyledTableCell className="header-row">
							<b>Direccion</b>
						</StyledTableCell>
						<StyledTableCell className="header-row">
							<b>Latitud</b>
						</StyledTableCell>
						<StyledTableCell className="header-row">
							<b>Longitd</b>
						</StyledTableCell>
						<StyledTableCell className="header-row">
							<b>Nivel</b>
						</StyledTableCell>
						<StyledTableCell className="header-row">
							<b>Ciudad</b>
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow className="bedItem">
						<TableCell>
							<IconButton
								aria-label="expand row"
								size="small"
								onClick={() => setOpen(!open)}
							>
								{open ? (
									<KeyboardArrowUpIcon />
								) : (
									<KeyboardArrowDownIcon />
								)}
							</IconButton>
						</TableCell>
						<TableCell>{ips.ipsName}</TableCell>
						<TableCell>{ips.ipsAddress}</TableCell>
						<TableCell>{ips.ipsLatitude}</TableCell>
						<TableCell>{ips.ipsLongitude}</TableCell>
						<TableCell>{ips.ipsLevel}</TableCell>
						<TableCell>{ips.city.cityName}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							style={{ paddingBottom: 0, paddingTop: 0 }}
							colSpan={6}
						>
							<Collapse in={open} timeout="auto" unmountOnExit>
								<Box sx={{ margin: 1 }}>
									<Typography variant="h6" gutterBottom>
										Camas de la IPS
									</Typography>
									<Box sx={{ margin: 1, display: 'flex' }}>
										<TextField
											sx={{ marginRight: 1 }}
											id="outlined-read-only-input"
											label={'Camas Adultos'}
											defaultValue={ips.ipsIcuadultbeds}
											InputProps={{
												readOnly: true,
											}}
										/>
										<TextField
											sx={{ marginRight: 1 }}
											id="outlined-read-only-input"
											label={'Camas Pediatricas'}
											defaultValue={ips.ipsIcupedibeds}
											InputProps={{
												readOnly: true,
											}}
										/>
										<TextField
											sx={{ marginRight: 1 }}
											id="outlined-read-only-input"
											label={'Camas Neo-natos'}
											defaultValue={ips.ipsIcuneobeds}
											InputProps={{
												readOnly: true,
											}}
										/>
									</Box>
								</Box>
							</Collapse>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</React.Fragment>
	);
};

export default AssignIPS;
