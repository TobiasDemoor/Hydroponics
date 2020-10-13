import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Typography, Card, Container, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { login } from '../store/auth/actions'

const styles = theme => ({
    form: {
        marginTop: "10%"
    },
    card: {
        padding: theme.spacing(4)
    },
    input: {
        marginBottom: theme.spacing(4)
    }
})

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const { id, value } = e.target
        this.setState(() => {
            return { [id]: value }
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const { username, password } = this.state
        console.debug("hola")
        this.props.login(username, password)
    }

    render() {
        const { classes } = this.props
        const { username, password } = this.state
        return (
            <div className={classes.root}>
                <Container maxWidth="sm" className={classes.form}>
                    <Card className={classes.card}>
                        <form onSubmit={this.handleSubmit}>
                            <Typography variant="h5">Iniciar sesión</Typography>
                            <TextField
                                className={classes.input}
                                id="username"
                                label="Usuario"
                                type="username"
                                value={username}
                                autoComplete="current-username"
                                fullWidth="true"
                                onChange={this.handleChange}
                            />
                            <TextField
                                className={classes.input}
                                id="password"
                                label="Contraseña"
                                type="password"
                                value={password}
                                autoComplete="current-password"
                                fullWidth="true"
                                onChange={this.handleChange}
                            />
                            <Button variant="contained" color="primary" type="submit">
                                Confirmar
                            </Button>
                        </form>
                    </Card>
                </Container>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(login(username, password))
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(Login))
