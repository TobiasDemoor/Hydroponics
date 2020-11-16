import React from 'react'
import { Box, TableCell, TableHead, TableRow, withStyles } from "@material-ui/core"
const { colors } = require('../../config').constants

export const HeaderCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    }
}))(TableCell)


export function ColorCell({ min, max, value, ...props }) {
    const minF = parseFloat(min)
    const maxF = parseFloat(max)

    if (isNaN(minF) && isNaN(maxF)) {
        return (
            <TableCell {...props}>
                {value}
            </TableCell>
        )
    } else {
        const v = parseFloat(value)
        const ok = (isNaN(minF) || min < v) && (isNaN(maxF) || v < maxF)
        return (
            <Box
                component={TableCell}
                bgcolor={ok ? colors.ok : colors.error}
                {...props}
            >
                {value}
            </Box>
        )
    }
}

export function ColoredTableHead({ columns, }) {
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