import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import Login from './components/Login.jsx'

const styles = theme => ({
    root: {
        heigth: "100%",
        width: "100%",
        background: theme.palette.primary.light
    }
})

function App({ classes }) {
    document.body.className = classes.root
    return (
        <div className="App">
            <Login />
        </div>
    );
}


export default withStyles(styles)(App);
