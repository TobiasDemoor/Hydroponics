import React from 'react'
import { Box, Grid, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import checkMinMax from '../../helpers/checkMinMax'
import LoadingSwitch from '../common/LoadingSwitch'

const config = require('../../config')
const { goToSection } = config.strings
const { colors, sections, actuator: { on } } = config.constants
const {
    ambient,
    fishtank,
    upperbed,
    mediumbed,
    lowerbed
} = sections


const styles = theme => ({
    item: {
        height: "100%",
        width: "100%",
        borderRadius: theme.spacing(2),
        textAlign: "center",
        display: "table"
    },
    link: {
        display: "table-cell",
        verticalAlign: "middle",
        textDecoration: "none",
        color: "black"
    },
})

const BoxSection = withStyles(styles)(
    ({ id, classes, data, xs, height }) => {
        const { title, columns, row } = data
        const ok = columns.every(column => {
            if (column.alarma) {
                const { id, min, max } = column
                return checkMinMax(row[id], min, max) ?? false;
            } else {
                return true;
            }
        })
        return (
            <Grid item xs={xs}>
                <Box
                    key={id}
                    className={classes.item}
                    style={{ height }}
                    bgcolor={ok ? colors.ok : colors.error}
                >
                    <Link to={id} className={classes.link}>
                        {`${goToSection} ${title}`}
                    </Link>
                </Box>
            </Grid>
        )
    }
)

function Diagram({
    sections, executing, height, actuators,
    handleOnOff, classes
}) {
    const [act0, act1] = actuators;
    const actState = sections.main.row;
    return (
        <Grid container spacing={1} height="100%">
            <BoxSection
                id={ambient}
                key={ambient}
                data={sections[ambient]}
                height={height * 0.15}
                xs={12}
            />
            <Grid item xs={12} className={classes.item}>
                <LoadingSwitch
                    color="primary"
                    id={act0}
                    checked={actState[act0] === on}
                    onChange={handleOnOff}
                    loading={executing}
                />
            </Grid>
            <BoxSection
                id={fishtank}
                key={fishtank}
                data={sections[fishtank]}
                xs={6}
            />
            <Grid container item spacing={1} xs={6} direction="column">
                <BoxSection
                    id={upperbed}
                    key={upperbed}
                    data={sections[upperbed]}
                    height={height * 0.15}
                />
                <BoxSection
                    id={mediumbed}
                    key={mediumbed}
                    data={sections[mediumbed]}
                    height={height * 0.15}
                />
                <BoxSection
                    id={lowerbed}
                    key={lowerbed}
                    data={sections[lowerbed]}
                    height={height * 0.15}
                />
            </Grid>
            <Grid item xs={12} className={classes.item}>
                <LoadingSwitch
                    color="primary"
                    id={act1}
                    checked={actState[act1] === on}
                    onChange={handleOnOff}
                    loading={executing}
                />
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Diagram);