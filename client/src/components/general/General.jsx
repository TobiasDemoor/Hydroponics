import React, { Component } from 'react'
import UserIcon from '@material-ui/icons/AccountCircle'
import Refresh from '@material-ui/icons/Refresh'
import {
    CircularProgress,
    Container,
    IconButton, Menu, MenuItem, withStyles
} from '@material-ui/core'
import { connect } from 'react-redux'
import NavBar from '../common/NavBar'
import logOut from '../../helpers/logOut'
import { changeOnOffGeneral, update } from '../../store/data/actions'
import { ErrorMessage, Title } from '../common/messages'
import Diagram from './Diagram'

const config = require('../../config')
const { mainTitle, changeLoginLink, logOutLink } = config.strings
const { types: { actuator } } = config.constants

const styles = theme => ({
    loading: {
        marginLeft: "50%",
        left: -20
    },
})

class General extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: null,
            anchorEl: null,
            requestedUpdate: false,
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleMenu = this.handleMenu.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
        this.handleOnOff = this.handleOnOff.bind(this)
    }

    updateWindowDimensions() {
        this.setState({ height: window.innerHeight });
    }

    componentDidMount() {
        this.props.update()
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    handleUpdate() {
        this.props.update();
        this.setState({
            requestedUpdate: true,
        })
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

    handleOnOff(e) {
        this.props.changeOnOff(e.target.id)
    }

    render() {
        const { anchorEl, height, requestedUpdate } = this.state;
        const { isFetching, sections, executing, error, classes } = this.props;

        let actuators = ['', '']
        if (sections) {
            actuators = sections.main.columns
                .filter(elem => elem.type && elem.type.toLowerCase() === actuator)
                .map(elem => elem.id)
        }

        return (
            < >
                <NavBar>
                    <IconButton style={{ marginLeft: 'auto' }} onClick={this.handleUpdate}>
                        <Refresh color="primary" />
                    </IconButton>
                    <IconButton onClick={this.handleMenu} >
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
                <Container maxWidth="lg">
                    <Title text={mainTitle} />
                    <ErrorMessage error={error} />
    
                    { (!isFetching || !requestedUpdate) && sections ?
                        <Diagram
                            sections={sections}
                            executing={executing}
                            error={error}
                            height={height}
                            actuators={actuators}
                            handleOnOff={this.handleOnOff}
                        />
                        : isFetching &&
                        <CircularProgress className={classes.loading} />
                    }
                </Container>
            </ >
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(General));