import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Pruebas extends Component {
    render() {
        return (
            <div>
                <Link to="0">Ir a tabla 0</Link>
                <br/>
                <Link to="1">Ir a tabla 1</Link>
            </div>
        )
    }
}


export default Pruebas