import React from 'react'
import { TableCell, withStyles } from "@material-ui/core"

export const HeaderCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    }
}))(TableCell)


export const ColorCell = withStyles(theme => ({
    cellOk: {
        backgroundColor: theme.palette.success.light
    },
    cellWarn: {
        backgroundColor: theme.palette.error.light
    }
}))(
    function ({ column, row, classes }) {
        const value = row[column.id];
        const min = parseFloat(column.min)
        const max = parseFloat(column.max)
        console.log(min, max)

        if (isNaN(min) && isNaN(max)) {
            return (
                <TableCell key={column.id} align={column.align}>
                    {value}
                </TableCell>
            )
        } else {
            const v = parseFloat(value)
            const ok = (isNaN(min) || min < v) && (isNaN(max) || v < max)
            return (
                <TableCell
                    className={ok ?
                        classes.cellOk : classes.cellWarn
                    }
                    key={column.id}
                    align={column.align}
                >
                    {value}
                </TableCell>
            )
        }
    }
)