import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography, Card, Container, CardContent, CardActions } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { login } from '../../store/auth/actions'
import LoadingButton from '../common/LoadingButton';
import isLoggedIn from '../../helpers/isLoggedIn';
import FormFields from '../common/FormFields';
const strings = require("../../config").strings

const styles = theme => ({
    form: {
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -80%)'
    },
    card: {
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper
    },
    spaced: {
        marginBottom: theme.spacing(4)
    },
    error: {
        color: theme.palette.error.main
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
            <Container maxWidth="sm" className={classes.form}>
                <Card className={classes.card}>
                    <form onSubmit={this.handleSubmit}>
                        <CardContent>
                            {error &&
                                <Typography
                                    className={`${classes.spaced} ${classes.error}`}
                                >
                                    {error}
                                </Typography>
                            }
                            <Typography
                                className={classes.spaced}
                                variant="h5"
                            >
                                {strings.tituloLogin}
                            </Typography>
                            <FormFields
                                className={classes.spaced}
                                campos={[
                                    {
                                        id: "username",
                                        label: strings.usuario,
                                        type: "username",
                                        value: username,
                                        autoComplete: "current-username",
                                        required: true,
                                    },
                                    {
                                        id: "password",
                                        label: strings.password,
                                        type: "password",
                                        value: password,
                                        autoComplete: "current-password",
                                        required: true,
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
                                loading={isFetching}
                                text={strings.confirmarLogin}
                            />
                        </CardActions>
                    </form>
                </Card>
            </Container>
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
