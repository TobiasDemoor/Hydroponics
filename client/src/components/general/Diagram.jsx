import { Box, CircularProgress, Container, Grid, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import checkMinMax from '../../helpers/checkMinMax'
import { changeOnOffGeneral, update } from '../../store/data/actions'
import LoadingSwitch from '../common/LoadingSwitch'
import { ErrorMessage } from '../common/messages'

const config = require('../../config')
const { goToSection } = config.strings
const { colors } = config.constants
const {
    ambient,
    fishtank,
    upperbed,
    mediumbed,
    lowerbed
} = config.constants.sections
const { on } = config.constants.actuator


const styles = theme => ({
    root: {
        position: 'relative'
    },
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
    },
    loading: {
        marginLeft: "50%",
        left: -20
    },
})

function BoxSection({ id, classes, data, xs, height }) {
    const { title, columns, row } = data
    const ok = columns.every(column => {
        if (column.alarma) {
            const { id, min, max } = column
            return checkMinMax(row[id], min, max) || true;  
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
        const { isFetching, sections, executing, error, classes } = this.props;
        return (
            <Container maxWidth="lg" className={classes.root} >
                <ErrorMessage error={error} />
                {!isFetching && sections ?
                    <Grid container spacing={1} height="100%">
                        <BoxSection
                            id={ambient}
                            key={ambient}
                            data={sections[ambient]}
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
                            id={fishtank}
                            key={fishtank}
                            data={sections[fishtank]}
                            classes={classes}
                            xs={6}
                        />
                        <Grid container item spacing={1} xs={6} direction="column">
                            <BoxSection
                                id={upperbed}
                                key={upperbed}
                                data={sections[upperbed]}
                                classes={classes}
                                height={height * 0.15}
                            />
                            <BoxSection
                                id={mediumbed}
                                key={mediumbed}
                                data={sections[mediumbed]}
                                classes={classes}
                                height={height * 0.15}
                            />
                            <BoxSection
                                id={lowerbed}
                                key={lowerbed}
                                data={sections[lowerbed]}
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
                    :
                    <CircularProgress className={classes.loading} />
                }
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    isFetching: state.data.isFetching,
    sections: state.data.sections,
    executing: state.data.executing,
    error: state.data.error,
})

const mapDispatchToProps = dispatch => ({
    update: () => dispatch(update()),
    changeOnOff: id => dispatch(changeOnOffGeneral(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Diagram))