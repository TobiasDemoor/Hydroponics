import React, { Component } from 'react'
import {
    Paper, Table, TableBody,
    TableContainer, TablePagination, TableRow
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import config from '../../config';
import { ColorCell, ColoredTableHead } from './TableCommons';


const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
})


class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: null,
            heigth: null,
        }
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
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

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }


    updateWindowDimensions() {
        this.setState({ height: window.innerHeight });
    }

    render() {
        const { columns, rows, classes } = this.props;
        const rowsPerPageOptions = this.props.rowsPerPageOptions || config.rowsPerPageOptions
        const { page, height } = this.state;
        const rowsPerPage = this.state.rowsPerPage || rowsPerPageOptions[0]
        const aux = page * rowsPerPage;
        const showPageOptions = rowsPerPageOptions.length > 1
        const containerStyle = height ? {maxHeight: height * 0.8} : {}
        return (
            <Paper className={classes.root}>
                <TableContainer style={containerStyle}>
                    <Table stickyHeader size="small" className={classes.table}>
                        <ColoredTableHead columns={columns} />
                        <TableBody>
                            {rows.slice(aux, aux + rowsPerPage).map((row, i) => (
                                <TableRow hover key={`row${i}`}>
                                    {columns.map(({id, min, max, align}, j) =>
                                        <ColorCell
                                            min={min}
                                            max={max}
                                            key={`cell${j}`}
                                            value={row[id]}
                                            align={align}
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
