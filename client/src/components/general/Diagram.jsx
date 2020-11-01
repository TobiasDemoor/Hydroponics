import { Box, CircularProgress, Grid, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeOnOffGeneral, update } from '../../store/data/actions'
import LoadingSwitch from '../common/LoadingSwitch'

const config = require('../../config')
const { goToSection } = config.strings
const { colors } = config.constants
const { on } = config.constants.actuator


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
        verticalAlign: "middle"
    }
})

function BoxSection({ id, classes, data, xs, height }) {
    const { title, columns, row } = data
    const ok = columns.every(column => {
        if (column.alarma) {
            const { id, min, max } = column
            const v = parseFloat(row[id])
            return (isNaN(min) || min < v) && (isNaN(max) || v < max)
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

class Diagram extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: null
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.handleOnOff = this.handleOnOff.bind(this)
    }

    componentDidMount() {
        this.props.update()
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ height: window.innerHeight });
    }

    handleOnOff(e) {
        this.props.changeOnOff(e.target.id)
    }

    render() {
        const { height } = this.state;
        const { isFetching, sections, executing, classes } = this.props;
        return (
            <div>
                {isFetching || !sections ?
                    <CircularProgress />
                    :
                    <Grid container spacing={1} height="100%">
                        <BoxSection
                            id="ambient"
                            key="ambient"
                            data={sections.ambient}
                            classes={classes}
                            height={height * 0.15}
                            xs={12}
                        />
                        <Grid item xs={12}>
                            <div className={classes.item}>
                                <LoadingSwitch
                                    color="primary"
                                    id="pump0"
                                    checked={sections.general.row.pump0 === on}
                                    onChange={this.handleOnOff}
                                    loading={executing}
                                />
                            </div>
                        </Grid>
                        <BoxSection
                            id="fishtank"
                            key="fishtank"
                            data={sections.fishtank}
                            classes={classes}
                            xs={6}
                        />
                        <Grid container item spacing={1} xs={6} direction="column">
                            <BoxSection
                                id="claymediagrowbed"
                                key="claymediagrowbed"
                                data={sections.claymediagrowbed}
                                classes={classes}
                                height={height * 0.15}
                            />
                            <BoxSection
                                id="deepwatergrowbed0"
                                key="deepwatergrowbed0"
                                data={sections.deepwatergrowbed0}
                                classes={classes}
                                height={height * 0.15}
                            />
                            <BoxSection
                                id="deepwatergrowbed1"
                                key="deepwatergrowbed1"
                                data={sections.deepwatergrowbed1}
                                classes={classes}
                                height={height * 0.15}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.item}>
                                <LoadingSwitch
                                    color="primary"
                                    id="pump1"
                                    checked={sections.general.row.pump1 === on}
                                    onChange={this.handleOnOff}
                                    loading={executing}
                                />
                            </div>
                        </Grid>
                    </Grid>
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    isFetching: state.data.isFetching,
    sections: state.data.sections,
    executing: state.data.executing
})

const mapDispatchToProps = dispatch => ({
    update: () => dispatch(update()),
    changeOnOff: id => dispatch(changeOnOffGeneral(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Diagram))