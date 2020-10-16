import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import PrivateRoute from './helpers/PrivateRoute'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import ChangeLogin from './components/ChangeLogin';

const styles = theme => ({
    root: {
        heigth: "100%",
        width: "100%",
        background: theme.palette.background.default
    }
})

function App({ classes }) {
    document.body.className = classes.root
    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path= "/" exact component={Home} />
                    <Route path='/login' component={Login} />
                    <PrivateRoute path='/changeLogin' component={ChangeLogin} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}


export default withStyles(styles)(App);
