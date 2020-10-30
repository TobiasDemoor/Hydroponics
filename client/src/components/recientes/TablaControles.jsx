import { CircularProgress, Switch } from '@material-ui/core'
import React from 'react'
import DataTable from '../common/DataTable'

const config = require("../../config")
const { on } = config.constants.actuator
const {
    controlesLabel, controlesState
} = config.strings


export default function TablaControles({
    valoresAct, columns, handlerOnOff, executing
}) {
    const rows = []
    columns.forEach(({ id, label }) => {
        rows.push({
            label,
            code: id,
            value: !executing ?
                <Switch
                    key={`switch${id}`}
                    id={id}
                    checked={valoresAct[id] === on}
                    onChange={handlerOnOff}
                    color="secondary"
                />
                :
                <CircularProgress
                    key={`circular${id}`}
                    color="secondary"
                    size={32}
                />
        })
    })
    return (
        <div>
            <DataTable
                rowsPerPageOptions={[rows.length]}
                columns={[
                    { label: controlesLabel, id: "label", align: "center", minWidth: "50%" },
                    { label: controlesState, id: "value", align: "center", minWidth: "50%" },
                ]}
                rows={rows}
            />
        </div>
    )
}