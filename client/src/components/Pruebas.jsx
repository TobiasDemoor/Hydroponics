import React, { Component } from 'react'
import { Container } from '@material-ui/core';
import logOut from '../helpers/logOut'
import PruebaRecientes from './PruebaRecientes';

class Pruebas extends Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    handleLogOut() {
        logOut()
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <Container maxWidth="lg">
                    <PruebaRecientes />
                </Container>
            </div>
        )
    }
}


export default Pruebas