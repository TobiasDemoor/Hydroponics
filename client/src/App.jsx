import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import PrivateRoute from './helpers/PrivateRoute'
import Login from './components/Login.jsx'
import General from './components/General.jsx'
import ChangeLogin from './components/ChangeLogin';
import Recientes from './components/Recientes';

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
                    <Route path='/login' component={Login} />
                    <PrivateRoute path='/changeLogin' component={ChangeLogin} />
                    <PrivateRoute path="/:id" component={Recientes} />
                    <PrivateRoute path="/" exact component={General} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}


export default withStyles(styles)(App);
