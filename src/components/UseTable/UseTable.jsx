import React, { useState } from 'react'
import Table from '@mui/material/Table';
import { TableCell, TableHead, TableRow, TablePagination } from '@mui/material';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
           
            backgroundColor: '#aeb0b2',
            
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
    },
}))

function UseTable (records, headCells) {

    const classes = useStyles();

    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

    const TblContainer = props =>(
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    const TblPagination = () => (
        <TablePagination 
            component='div'
            page={page}
            labelRowsPerPage = "Filas"
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={records.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )

    const recordsAfterPaging = () => {
        return records.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }
    
    const TblHead = props =>{
        return(
            <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell =>(
                            <TableCell key={headCell.id}>{headCell.label}</TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }
    
    return {
        TblHead,
        TblContainer,
        TblPagination,
        recordsAfterPaging
    }
};

export default UseTable
