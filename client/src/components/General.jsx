import React, { Component } from 'react'
import UserIcon from '@material-ui/icons/AccountCircle'
import NavBar from './common/NavBar'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import logOut from '../helpers/logOut'
import Pruebas from './Pruebas'


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
                            Cambiar login
                        </MenuItem>
                        <MenuItem onClick={this.handleLogOut}>
                            Cerrar sesión
                        </MenuItem>
                    </Menu>
                </NavBar>
                <Pruebas history={this.props.history} />
            </div>
        )
    }
}

export default General
