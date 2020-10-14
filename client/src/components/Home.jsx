import React, { Component } from 'react'
import logOut from '../helpers/logOut'
import LoadingButton from './common/LoadingButton'

class Home extends Component {
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
                <LoadingButton
                    text="Cerrar sesión"
                    onClick={this.handleLogOut}
                />
                <p>Hola mundo</p>
            </div>
        )
    }
}


export default Home