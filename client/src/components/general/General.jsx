import React, { Component } from 'react'
import UserIcon from '@material-ui/icons/AccountCircle'
import Refresh from '@material-ui/icons/Refresh'
import NavBar from '../common/NavBar'
import {
    IconButton, Menu, MenuItem
} from '@material-ui/core'
import logOut from '../../helpers/logOut'
import Diagram from './Diagram'
import { update } from '../../store/data/actions'
import { connect } from 'react-redux'

const { changeLoginLink, logOutLink } = require('../../config').strings


class General extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
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

        return (
            < >
                <NavBar>
                    <IconButton style={{ marginLeft: 'auto' }} onClick={this.props.update}>
                        <Refresh color="primary"/>
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
                <Diagram />
            </ >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    update: () => dispatch(update())
})

export default connect(null, mapDispatchToProps)(General);
