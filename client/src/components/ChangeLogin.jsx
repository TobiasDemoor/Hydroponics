import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography, Card, Container, CardContent, CardActions } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { modifyLogin } from '../store/auth/actions'
import LoadingButton from './common/LoadingButton';
import FormFields from './common/FormFields';

const styles = theme => ({
    form: {
        marginTop: "10%"
    },
    card: {
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper
    },
    message: {
        marginBottom: theme.spacing(4)
    },
    input: {
        marginBottom: theme.spacing(4)
    },
    cardActions: {
        justifyContent: 'center'
    }
})

class ChangeLogin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUsername: "",
            currentPassword: "",
            newUsername: "",
            newPassword: "",
            newPasswordVerify: "",
            error: null
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
        const {
            currentUsername, currentPassword,
            newUsername, newPassword, newPasswordVerify
        } = this.state
        if (newPassword === newPasswordVerify) {
            this.setState(() => {
                return { error: null }
            })
            this.props.modifyLogin(currentUsername, currentPassword, newUsername, newPassword);
        } else {
            this.setState(() => {
                return {
                    newPassword: "",
                    newPasswordVerify: "",
                    error: "Las contraseñas no coinciden"
                }
            })
        }
    }

    render() {
        const { classes, isFetching, message } = this.props
        const error = this.props.error || this.state.error;
        const {
            currentUsername, currentPassword,
            newUsername, newPassword, newPasswordVerify
        } = this.state
        return (
            <div className={classes.root}>
                <Container maxWidth="sm" className={classes.form}>
                    <Card className={classes.card}>
                        <form onSubmit={this.handleSubmit}>
                            <CardContent>
                                {message &&
                                    <div className={classes.message}>
                                        <Typography variant="h7" color="success">{message}</Typography>
                                    </div>
                                }
                                {error &&
                                    <div className={classes.message}>
                                        <Typography variant="h7" color="error">{error}</Typography>
                                    </div>
                                }
                                <Typography variant="h5">Cambiar login</Typography>
                                <FormFields
                                    className={classes.input}
                                    campos={[
                                        {
                                            id: "currentUsername",
                                            label: "Usuario actual",
                                            type: "username",
                                            value: currentUsername,
                                            autoComplete: "current-username",
                                        },
                                        {
                                            id: "currentPassword",
                                            label: "Contraseña actual",
                                            type: "password",
                                            value: currentPassword,
                                            autoComplete: "current-password",
                                        },
                                        {
                                            id: "newUsername",
                                            label: "Usuario nuevo",
                                            type: "username",
                                            value: newUsername,
                                            autoComplete: "new-username",
                                        },
                                        {
                                            id: "newPassword",
                                            label: "Contraseña nueva",
                                            type: "password",
                                            value: newPassword,
                                            autoComplete: "new-password",
                                        },
                                        {
                                            id: "newPasswordVerify",
                                            label: "Repetir contraseña nueva",
                                            type: "password",
                                            value: newPasswordVerify,
                                            autoComplete: "new-password",
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
    error: state.auth.error,
    message: state.auth.message
})

const mapDispatchToProps = dispatch => ({
    modifyLogin: (
        currentUsername, currentPassword, newUsername, newPassword
    ) => dispatch(modifyLogin(currentUsername, currentPassword, newUsername, newPassword))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChangeLogin))