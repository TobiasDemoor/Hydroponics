import { AppBar, Container, Toolbar, withStyles } from '@material-ui/core'
import React from 'react'

const styles = () => ({
    bar: {
        background: 'transparent',
        boxShadow: 'none'
    }
})

function NavBar({ children, classes }) {
    return (
        <AppBar position="static" className={classes.bar}>
            <Container maxWidth="xl">
                <Toolbar>
                    {children}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default withStyles(styles)(NavBar)
