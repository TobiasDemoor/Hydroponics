import React from 'react'
import { Box, Grid, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import LoadingSwitch from '../common/LoadingSwitch'
import sectionStatus from './sectionStatus'

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
    ({ id, classes, data, height }) => {
        const { title, columns, row } = data
        const ok = columns.every(column => sectionStatus(column, row))
        const color = ok ? colors.ok : colors.error
        return (
            <Box
                className={classes.item}
                style={{ height }}
                bgcolor={color}
            >
                <Link to={id} className={classes.link}>
                    {`${goToSection}${title}`}
                </Link>
            </Box>
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
            <Grid item xs={12}>
                <BoxSection
                    id={ambient}
                    data={sections[ambient]}
                    height={height * 0.15}
                />
            </Grid>
            <Grid item xs={12} className={classes.item}>
                <LoadingSwitch
                    color="primary"
                    id={act0}
                    checked={actState[act0] === on}
                    onChange={handleOnOff}
                    loading={executing}
                />
            </Grid>
            <Grid item xs={6}>
                <BoxSection
                    id={fishtank}
                    data={sections[fishtank]}
                />
            </Grid>
            <Grid container item spacing={1} xs={6} direction="column">
                <Grid item>
                    <BoxSection
                        id={upperbed}
                        data={sections[upperbed]}
                        height={height * 0.15}
                    />
                </Grid>
                <Grid item>
                    <BoxSection
                        id={mediumbed}
                        data={sections[mediumbed]}
                        height={height * 0.15}
                    />
                </Grid>
                <Grid item>
                    <BoxSection
                        id={lowerbed}
                        data={sections[lowerbed]}
                        height={height * 0.15}
                    />
                </Grid>
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