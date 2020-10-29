import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './helpers/PrivateRoute'
import Login from './components/auth/Login.jsx'
import General from './components/General.jsx'
import ChangeLogin from './components/auth/ChangeLogin.jsx';
import Recientes from './components/recientes/Recientes.jsx';

const styles = theme => ({
    root: {
        background: theme.palette.background.default
    },
})

function App({ classes }) {
    document.body.className = classes.root
    return (
        <div className={classes.app}>
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
