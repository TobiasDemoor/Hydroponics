import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography, Card, Container, CardContent, CardActions } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { login } from '../store/auth/actions'
import LoadingButton from './common/LoadingButton';
import isLoggedIn from '../helpers/isLoggedIn';
import FormFields from './common/FormFields';

const styles = theme => ({
    form: {
        marginTop: "10%"
    },
    card: {
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper
    },
    error: {
        marginBottom: theme.spacing(4)
    },
    input: {
        marginBottom: theme.spacing(4)
    },
    cardActions: {
        justifyContent: 'center'
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
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
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
        this.props.login(username, password)
    }

    componentDidUpdate() {
        if (isLoggedIn()) {
            this.props.history.push('/')
        }
    }

    render() {
        const { classes, isFetching, error } = this.props
        const { username, password } = this.state
        return (
            <div className={classes.root}>
                <Container maxWidth="sm" className={classes.form}>
                    <Card className={classes.card}>
                        <form onSubmit={this.handleSubmit}>
                        <CardContent>
                            {error &&
                                <div className={classes.error}>
                                    <Typography variant="h7" color="error">{error}</Typography>
                                </div>
                            }
                                <Typography variant="h5">Iniciar sesión</Typography>
                                <FormFields
                                    className={classes.input}
                                    campos={[
                                        {
                                            id:"username",
                                            label:"Usuario",
                                            type:"username",
                                            value:username,
                                            autoComplete:"current-username"
                                        },
                                        {
                                            id:"password",
                                            label:"Contraseña",
                                            type:"password",
                                            value:password,
                                            autoComplete:"current-password",
                                        }
                                    ]}
                                    fullWidth={true}
                                    onChange={this.handleChange}
                                    />
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                                <LoadingButton
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    text="Confirmar"
                                    loading={isFetching}
                                />
                        </CardActions>
                            </form>
                    </Card>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isFetching: state.auth.isFetching,
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(login(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
