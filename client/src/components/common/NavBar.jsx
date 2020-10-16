import { AppBar, Toolbar } from '@material-ui/core'
import React from 'react'

export default function NavBar({ children }) {
    return (
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
            <Toolbar>
                {children}
            </Toolbar>
        </AppBar>
    )
}
