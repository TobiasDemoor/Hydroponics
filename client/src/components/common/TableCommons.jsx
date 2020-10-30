import React from 'react'
import { TableCell, TableHead, TableRow, withStyles } from "@material-ui/core"

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
    function ({ column, row, classes, index: key }) {
        const { id, align } = column
        const value = row[id];
        const min = parseFloat(column.min)
        const max = parseFloat(column.max)

        if (isNaN(min) && isNaN(max)) {
            return (
                <TableCell key={`cellcontent${key}`} align={align}>
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
                    key={`cellcontent${key}`}
                    align={align}
                >
                    {value}
                </TableCell>
            )
        }
    }
)

export function ColoredTableHead({columns, }) {
    return (
        <TableHead>
            <TableRow>
                {columns.map(({ label, align, minWidth }, index) => (
                    <HeaderCell
                        key={`column${index}`}
                        align={align}
                        style={minWidth && { minWidth }}
                    >
                        {label}
                    </HeaderCell>
                ))}
            </TableRow>
        </TableHead>
    )
}