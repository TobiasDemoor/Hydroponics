import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, withStyles } from '@material-ui/core'
import React from 'react'
import LoadingButton from '../common/LoadingButton'
import { ColorCell, HeaderCell } from '../common/TableCommons'

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
        margin: theme.spacing(2),
        float: 'right'
    }
})

function CeldaTexto({ handler, ...props }) {
    return <TextField
        {...props}
        onChange={handler}
        fullWidth
        InputProps={{ disableUnderline: true }}
        inputProps={{
            style: { textAlign: 'center' },
            step: 0.01
        }}
    />
}

function TablaResumen({
    valoresAct, columns, handlerTexto, handlerAlarma, classes, isPushing, submitChanges, modified
}) {
    const rows = []
    columns.forEach(({ id, label, min, max, alarma }) => {
        rows.push({
            label,
            code: id,
            value: { valor: valoresAct[id], min, max},
            min: <CeldaTexto
                id={id}
                value={min}
                type="number"
                handler={e => handlerTexto(e, "min")}
            />,
            max: <CeldaTexto
                id={id}
                value={max}
                type="number"
                handler={e => handlerTexto(e, "max")}
            />,
            alarma: <Checkbox
                id={id}
                color="secondary"
                checked={alarma}
                onChange={handlerAlarma}
            />
        })
    })
    const cols = [
        { label: "Name", id: "label", align: "center" },
        { label: "Value", id: "value", align: "center" },
        { label: "Minimum", id: "min", align: "center" },
        { label: "Maxmimum", id: "max", align: "center" },
        { label: "Alarm", id: "alarma", align: "center", padding: "checkbox" }
    ]
    return (
        <div>
            <Paper className={classes.root}>
    <TableContainer className={classes.container}>
        <Table stickyHeader size="small" className={classes.table}>
            <TableHead>
                <TableRow>
                    {cols.map(column => (
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
                {rows.map(row => (
                    <TableRow hover key={row.code}>
                        {cols.map(column => {
                            const value = row[column.id]
                            if (column.id === "value") {
                                const v = parseFloat(value.valor)
                                const min = value.min
                                const max = value.max
                                const ok = (isNaN(min) || min < v) && (isNaN(max) || v < max)
                                return (
                                    <TableCell
                                        className={ok ?
                                            classes.cellOk : classes.cellWarn
                                        }
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {value.valor}
                                    </TableCell>
                                )                           
                            } else {
                                return <TableCell key={column.id} align={column.align}>
                                    {value}
                                </TableCell>
                            }
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Paper>
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
        </div>
    )
}


export default withStyles(styles)(TablaResumen)