import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Pruebas extends Component {
    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column    '}}>
                    <Link style={{flex: 1}} to="0">Ir a tabla 0</Link>
                    <br/>
                    <Link to="1">Ir a tabla 1</Link>
                </div>
            </div>
        )
    }
}


export default Pruebas