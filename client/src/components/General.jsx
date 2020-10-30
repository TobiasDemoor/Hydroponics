import React, { Component } from 'react'
import UserIcon from '@material-ui/icons/AccountCircle'
import NavBar from './common/NavBar'
import { Box, Button, IconButton, Menu, MenuItem, withStyles } from '@material-ui/core'
import logOut from '../helpers/logOut'
import Pruebas from './Pruebas'
import { Link } from 'react-router-dom'
import { update } from '../store/data/actions'
import { connect } from 'react-redux'

const styles = theme => ({
    containerBoxes: {
        display: 'flex',
        flexDirection: 'column',
        heigth: "100%",
        width: "100%",
    },
    rectangle: {
        width: "100px",
        height: "100px",
        borderRadius: "25px",
        textAlign: "center",
        flex: 1
    },
    center: {
        margin: "auto"
    }
})

const strings = require("../config").strings

class General extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null
        }

        this.handleMenu = this.handleMenu.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
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

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;
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
                            {strings.changeLoginLink}
                        </MenuItem>
                        <MenuItem onClick={this.handleLogOut}>
                            {strings.logOutLink}
                        </MenuItem>
                    </Menu>
                </NavBar>
                <Pruebas history={this.props.history} />
                <Button onClick={this.props.update}>AXA</Button>
                <div className={classes.containerBoxes}>
                    <Box
                        className={classes.rectangle}
                        bgcolor={`${true ? "success" : "error"}.main`}
                        style={{ flex: 1 }}
                    >
                        <Link to="0">Ir a tabla 0</Link>
                    </Box>
                    <Box
                        className={classes.rectangle}
                        bgcolor={`${true ? "success" : "error"}.main`}
                    >
                        <Link className={classes.center} to="0">Ir a tabla 0</Link>
                    </Box>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isFetching: state.data.isFetching,
    error: state.data.error,
})

const mapDispatchToProps = dispatch => ({
    update: () => dispatch(update())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(General));
