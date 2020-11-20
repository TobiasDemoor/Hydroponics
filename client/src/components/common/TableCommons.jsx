import React from 'react'
import { Box, TableCell, TableHead, TableRow, withStyles } from "@material-ui/core"
import checkMinMax from '../../helpers/checkMinMax'
const { colors } = require('../../config').constants

export const HeaderCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    }
}))(TableCell)


export function ColorCell({ min, max, value, ...props }) {
    const ok = checkMinMax(value, min, max)

    if (ok == null) {
        return (
            <TableCell {...props}>
                {value}
            </TableCell>
        )
    } else {
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