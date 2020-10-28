import { Checkbox, TextField } from '@material-ui/core'
import React from 'react'
import DataTable from '../common/DataTable'
import LoadingButton from '../common/LoadingButton'

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

export default function TablaResumen({
    valoresAct, columns, handlerTexto, handlerAlarma, classes, isPushing, submitChanges, modified
}) {
    const rows = []
    columns.forEach(({ id, label, min, max, alarma }) => {
        rows.push({
            label,
            code: id,
            value: valoresAct[id],
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
    return (
        <div>
            <DataTable
                rowsPerPageOptions={[rows.length]}
                columns={[
                    { label: "Name", id: "label", align: "center" },
                    { label: "Value", id: "value", align: "center" },
                    { label: "Minimum", id: "min", align: "center" },
                    { label: "Maxmimum", id: "max", align: "center" },
                    { label: "Alarm", id: "alarma", align: "center", padding: "checkbox" }
                ]}
                rows={rows}
            />
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
