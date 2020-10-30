import {
    Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, withStyles
} from '@material-ui/core'
import React from 'react'
import LoadingButton from '../common/LoadingButton'
import { ColoredTableHead } from '../common/TableCommons'

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

function Row({ index, data, value, id, classes, handlerTexto, handlerAlarma, ...props }) {
    const content = [
        <TableCell key={`$cell{index}0`} {...props}>
            {data.label}
        </TableCell>
    ]
    const { min, max, alarma } = data
    if (!isNaN(min) || !isNaN(max)) {
        const v = parseFloat(value)
        const ok = (isNaN(min) || min < v) && (isNaN(max) || v < max)
        content.push(
            <TableCell
                className={ok ?
                    classes.cellOk : classes.cellWarn
                }
                key={`$cell{index}1`}
                {...props}
            >
                {value}
            </TableCell>
        )
    } else {
        content.push(
            <TableCell key={`$cell{index}1`} {...props}>
                {value}
            </TableCell>
        )
    }

    content.push(
        <CeldaTexto
            key={`$cell{index}2`} id={id} value={min} type="number"
            handler={e => handlerTexto(e, "min")}
            cellProps={props}
        />,
        <CeldaTexto
            key={`$cell{index}3`} id={id} value={max} type="number"
            handler={e => handlerTexto(e, "max")}
            {...props}
        />,
        <TableCell key={`$cell{index}4`} {...props}>
            <Checkbox
                key={`$cellcontent{index}5`}
                id={id}
                color="secondary"
                checked={alarma}
                onChange={handlerAlarma}
            />
        </TableCell>
    )

    return (
        <TableRow hover key={`row${index}`}>
            {content}
        </TableRow>
    )
}

function TablaResumen({
    valoresAct, columns, handlerTexto, handlerAlarma, classes, isPushing, submitChanges, modified
}) {
    const headers = [
        { label: "Name", id: "label", align: "center" },
        { label: "Value", id: "value", align: "center" },
        { label: "Minimum", id: "min", align: "center" },
        { label: "Maxmimum", id: "max", align: "center" },
        { label: "Alarm", id: "alarma", align: "center", padding: "checkbox" }
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
                                    key={index}
                                    index={index}
                                    id={id}
                                    data={row}
                                    value={valoresAct[id]}
                                    classes={classes}
                                    handlerTexto={handlerTexto}
                                    handlerAlarma={handlerAlarma}
                                    align="center"
                                />
                            )
                        })}
                    </TableBody>
                </Table>
                {modified && (
                    <LoadingButton
                        className={classes.button}
                        loading={isPushing}
                        onClick={submitChanges}
                        variant="contained"
                        text="Guardar Cambios"
                        color="primary"
                    />
                )}
            </TableContainer>
        </Paper>
    )
}


export default withStyles(styles)(TablaResumen)