import {
    Button, Checkbox, CircularProgress, Paper, Table, TableBody,
    TableCell, TableContainer, TableRow, TextField, withStyles
} from '@material-ui/core'
import React from 'react'
import { ColorCell, ColoredTableHead } from '../common/TableCommons'

const config = require('../../config')
const {
    resumenLabel, resumenValue, resumenMin, resumenMax, resumenAlarm, saveChanges
} = config.strings


const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
    cellOk: {
        backgroundColor: theme.palette.success.light
    },
    cellWarn: {
        backgroundColor: theme.palette.error.light
    },
    button: {
        margin: theme.spacing(1),
        float: 'right'
    }
})

function CeldaTexto({ cellProps, handler, ...props }) {
    return (
        <TableCell {...cellProps}>
            <TextField
                fullWidth
                onChange={handler}
                InputProps={{ disableUnderline: true }}
                inputProps={{
                    style: { textAlign: 'center' },
                    step: 0.01
                }}
                {...props}
            />
        </TableCell>
    )
}

function Row({ index, data, value, id, handlerTexto, handlerAlarma, ...props }) {
    const { min, max, alarm, label } = data
    return (
        <TableRow hover>
            <TableCell
                {...props}
            >
                {label}
            </TableCell>
            <ColorCell
                min={min}
                max={max}
                value={value}
                {...props}
            />
            <CeldaTexto
                id={id}
                value={min}
                type="number"
                handler={e => handlerTexto(e, "min")}
                cellProps={props}
            />
            <CeldaTexto
                id={id}
                value={max}
                type="number"
                handler={e => handlerTexto(e, "max")}
                {...props}
            />
            <TableCell
                {...props}
            >
                <Checkbox
                    id={id}
                    color="secondary"
                    checked={alarm}
                    onChange={handlerAlarma}
                />
            </TableCell>
        </TableRow>
    )
}

function TablaResumen({
    valoresAct, columns, handlerTexto, handlerAlarma, classes, isPushing, submitChanges, modified
}) {
    const headers = [
        { label: resumenLabel, id: "label", align: "center" },
        { label: resumenValue, id: "value", align: "center" },
        { label: resumenMin, id: "min", align: "center" },
        { label: resumenMax, id: "max", align: "center" },
        { label: resumenAlarm, id: "alarm", align: "center", padding: "checkbox" }
    ]
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader size="small" className={classes.table}>
                    <ColoredTableHead key="head" columns={headers} />
                    <TableBody>
                        {columns.map((row, index) => {
                            const id = row.id
                            return (
                                <Row
                                    key={`row${index}`}
                                    index={index}
                                    id={id}
                                    data={row}
                                    value={valoresAct[id]}
                                    handlerTexto={handlerTexto}
                                    handlerAlarma={handlerAlarma}
                                    align="center"
                                />
                            )
                        })}
                    </TableBody>
                </Table>
                <Button
                    className={classes.button}
                    disabled={!modified || isPushing}
                    variant="contained"
                    color="primary"
                    onClick={submitChanges}
                >
                    {isPushing && <CircularProgress color="primary" size={24} />}
                    {!isPushing && saveChanges}
                </Button>
            </TableContainer>
        </Paper>
    )
}


export default withStyles(styles)(TablaResumen)