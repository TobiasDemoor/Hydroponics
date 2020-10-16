import React, { Component } from 'react'
import {
    Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TableRow
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
    container: {
        maxHeight: window.innerHeight*0.8,
    }
})

const HeaderCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    }
}))(TableCell)


class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
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
        const { page, rowsPerPage } = this.state;
        const aux = page * rowsPerPage;
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
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        )
    }
}

export default withStyles(styles)(DataTable)
