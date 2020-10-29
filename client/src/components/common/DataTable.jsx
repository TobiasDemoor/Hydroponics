import React, { Component } from 'react'
import {
    Paper, Table, TableBody,
    TableContainer, TableHead, TablePagination, TableRow
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import config from '../../config';
import { ColorCell, HeaderCell } from './TableCommons';


const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
    container: {
        maxHeight: window.innerHeight * 0.8,
    },
})


class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: null,
        }
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    }

    handleChangePage(e, newPage) {
        this.setState({ page: newPage });
    }

    handleChangeRowsPerPage(e) {
        this.setState({
            rowsPerPage: e.target.value,
            page: 0
        })
    }

    render() {
        const { columns, rows, classes } = this.props;
        const rowsPerPageOptions = this.props.rowsPerPageOptions || config.rowsPerPageOptions
        const { page } = this.state;
        const rowsPerPage = this.state.rowsPerPage || rowsPerPageOptions[0]
        const aux = page * rowsPerPage;
        const showPageOptions = rowsPerPageOptions.length > 1
        return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader size="small" className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <HeaderCell
                                        key={column.id}
                                        align={column.align}
                                        style={column.minWidth && { minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </HeaderCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(aux, aux + rowsPerPage).map(row => (
                                <TableRow hover key={row.code}>
                                    {columns.map(column => 
                                        <ColorCell
                                            column={column}
                                            row={row}
                                        />
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {showPageOptions &&
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />}
            </Paper>
        )
    }
}

export default withStyles(styles)(DataTable)
