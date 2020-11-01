import React from 'react'
import DataTable from '../common/DataTable'
import LoadingSwitch from '../common/LoadingSwitch'

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
            value:
                <LoadingSwitch
                    loading={executing}
                    id={id}
                    checked={valoresAct[id] === on}
                    onChange={handlerOnOff}
                    color="secondary"
                />
        })
    })
    const length = rows.length
    return (
        <div>
            {length ?
                <DataTable
                    rowsPerPageOptions={[length]}
                    columns={[
                        { label: controlesLabel, id: "label", align: "center", minWidth: "50%" },
                        { label: controlesState, id: "value", align: "center", minWidth: "50%" },
                    ]}
                    rows={rows}
                />
                : null
            }
        </div>
    )
}