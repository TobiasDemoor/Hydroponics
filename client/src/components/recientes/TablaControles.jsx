import { Switch } from '@material-ui/core'
import React from 'react'
import DataTable from '../common/DataTable'

const config = require("../../config")
const { on } = config.constants.actuator
const strings = config.strings


export default function TablaControles({
    valoresAct, columns, handlerOnOff
}) {
    const rows = []
    columns.forEach(({ id, label }) => {
        rows.push({
            label,
            code: id,
            value: <Switch
                id={id}
                checked={valoresAct[id] === on}
                onChange={handlerOnOff}
                color="secondary"
            />
        })
    })
    return (
        <div>
            <DataTable
                rowsPerPageOptions={[rows.length]}
                columns={[
                    { label: strings.controlesLabel, id: "label", align: "center" },
                    { label: strings.controlesState, id: "value", align: "center" },
                ]}
                rows={rows}
            />
        </div>
    )
}