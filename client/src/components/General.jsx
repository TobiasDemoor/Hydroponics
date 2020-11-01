import React, { Component } from 'react'
import UserIcon from '@material-ui/icons/AccountCircle'
import NavBar from './common/NavBar'
import {
    Box, Button, CircularProgress, Container, Grid, IconButton, Menu, MenuItem, Switch, withStyles
} from '@material-ui/core'
import logOut from '../helpers/logOut'
import { Link } from 'react-router-dom'
import { update } from '../store/data/actions'
import { connect } from 'react-redux'

const config = require('../config')
const { colors } = config.constants
const { changeLoginLink, logOutLink, goToSection } = config.strings


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

class General extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            height: null
        }

        this.handleMenu = this.handleMenu.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    handleMenu(e) {
        this.setState({
            anchorEl: e.currentTarget
        })
    }

    handleClose() {
        this.setState({
            anchorEl: null
        })
    }

    handleLogOut() {
        logOut()
        this.props.history.push('/')
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

    render() {
        const { anchorEl, height } = this.state;
        const { classes, isFetching, sections } = this.props;

        return (
            <div>
                <NavBar>
                    <IconButton style={{ marginLeft: 'auto' }} onClick={this.handleMenu} >
                        <UserIcon color="primary" />
                    </IconButton>
                    <Menu
                        id="menu-navbar"
                        anchorEl={anchorEl}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={() => this.props.history.push('/changeLogin')}>
                            {changeLoginLink}
                        </MenuItem>
                        <MenuItem onClick={this.handleLogOut}>
                            {logOutLink}
                        </MenuItem>
                    </Menu>
                </NavBar>
                <Button onClick={this.props.update}>Update</Button>
                { isFetching || !sections ?
                    <CircularProgress />
                    :
                    <Container maxWidth="lg">
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
                                    <Switch color="primary" />
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
                                    <Switch color="primary" />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isFetching: state.data.isFetching,
    error: state.data.error,
    sections: state.data.sections
})

const mapDispatchToProps = dispatch => ({
    update: () => dispatch(update())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(General));
