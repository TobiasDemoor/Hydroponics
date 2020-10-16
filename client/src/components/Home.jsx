import { Button, Container } from '@material-ui/core';
import React, { Component } from 'react'
import logOut from '../helpers/logOut'
import DataTable from './common/DataTable';
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
                <Container maxWidth="md">
                    <DataTable
                        columns = {
                            [
                                {id: "1", align:"center", label: "1"},
                                {id: "2", align:"center", label: "2"},
                                {id: "3", align:"center", label: "3"},
                                {id: "4", align:"center", label: "4"},
                                {id: "5", align:"center", label: "5"},
                            ]
                        }
                        rows = {
                            [
                                {code:"121", "1":"11", "2":"12", "3":"13", "4":"14", "5":"15"},
                                {code:"122", "1":"21", "2":"22", "3":"23", "4":"24", "5":"25"},
                                {code:"123", "1":"31", "2":"32", "3":"33", "4":"34", "5":"35"},
                                {code:"124", "1":"41", "2":"42", "3":"43", "4":"44", "5":"45"},
                                {code:"121", "1":"11", "2":"12", "3":"13", "4":"14", "5":"15"},
                                {code:"122", "1":"21", "2":"22", "3":"23", "4":"24", "5":"25"},
                                {code:"123", "1":"31", "2":"32", "3":"33", "4":"34", "5":"35"},
                                {code:"124", "1":"41", "2":"42", "3":"43", "4":"44", "5":"45"},
                                {code:"121", "1":"11", "2":"12", "3":"13", "4":"14", "5":"15"},
                                {code:"122", "1":"21", "2":"22", "3":"23", "4":"24", "5":"25"},
                                {code:"123", "1":"31", "2":"32", "3":"33", "4":"34", "5":"35"},
                                {code:"124", "1":"41", "2":"42", "3":"43", "4":"44", "5":"45"},
                                {code:"121", "1":"11", "2":"12", "3":"13", "4":"14", "5":"15"},
                                {code:"122", "1":"21", "2":"22", "3":"23", "4":"24", "5":"25"},
                                {code:"123", "1":"31", "2":"32", "3":"33", "4":"34", "5":"35"},
                                {code:"124", "1":"41", "2":"42", "3":"43", "4":"44", "5":"45"},
                                {code:"121", "1":"11", "2":"12", "3":"13", "4":"14", "5":"15"},
                                {code:"122", "1":"21", "2":"22", "3":"23", "4":"24", "5":"25"},
                                {code:"123", "1":"31", "2":"32", "3":"33", "4":"34", "5":"35"},
                                {code:"124", "1":"41", "2":"42", "3":"43", "4":"44", "5":"45"},
                                {code:"121", "1":"11", "2":"12", "3":"13", "4":"14", "5":"15"},
                                {code:"122", "1":"21", "2":"22", "3":"23", "4":"24", "5":"25"},
                                {code:"123", "1":"31", "2":"32", "3":"33", "4":"34", "5":"35"},
                                {code:"124", "1":"41", "2":"42", "3":"43", "4":"44", "5":"45"},
                                {code:"121", "1":"11", "2":"12", "3":"13", "4":"14", "5":"15"},
                                {code:"122", "1":"21", "2":"22", "3":"23", "4":"24", "5":"25"},
                                {code:"123", "1":"31", "2":"32", "3":"33", "4":"34", "5":"35"},
                                {code:"124", "1":"41", "2":"42", "3":"43", "4":"44", "5":"45"},
                                {code:"121", "1":"11", "2":"12", "3":"13", "4":"14", "5":"15"},
                                {code:"122", "1":"21", "2":"22", "3":"23", "4":"24", "5":"25"},
                                {code:"123", "1":"31", "2":"32", "3":"33", "4":"34", "5":"35"},
                                {code:"124", "1":"41", "2":"42", "3":"43", "4":"44", "5":"45"},
                            ]
                        }
                    />
                </Container>
                <LoadingButton
                    text="Cerrar sesión"
                    onClick={this.handleLogOut}
                />
                <Button onClick={() => this.props.history.push('/changeLogin')}>aca</Button>
                <p>Hola mundo</p>
            </div>
        )
    }
}


export default Home