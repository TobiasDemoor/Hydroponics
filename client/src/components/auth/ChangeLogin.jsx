import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography, Card, Container, CardContent, CardActions, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBack'
import { modifyLogin, clearModifyLogin } from '../../store/auth/actions'
import LoadingButton from '../common/LoadingButton';
import FormFields from '../common/FormFields';
import NavBar from '../common/NavBar';
import { ErrorMessage, SuccessMessage } from '../common/messages';

const strings = require("../../config").strings

const styles = theme => ({
    form: {

    },
    card: {
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper
    },
    spaced: {
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

    componentDidMount() {
        this.props.clearModifyLogin()
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
            this.setState({ error: null })
            this.props.modifyLogin(currentUsername, currentPassword, newUsername, newPassword);
        } else {
            this.setState({
                newPassword: "",
                newPasswordVerify: "",
                error: strings.passNoMatchError
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
            <>
                <NavBar>
                    <IconButton edge="start" onClick={() => this.props.history.push('/')}>
                        <BackIcon color="primary" size="medium" />
                    </IconButton>
                </NavBar>
                <Container maxWidth="sm" className={classes.form}>
                    <Card className={classes.card}>
                        <form onSubmit={this.handleSubmit}>
                            <CardContent>
                                <SuccessMessage message={message} />
                                <ErrorMessage error={error} />
                                <Typography className={classes.spaced} variant="h5">
                                    {strings.tituloChangeLogin}
                                </Typography>
                                <FormFields
                                    className={classes.spaced}
                                    campos={[
                                        {
                                            id: "currentUsername",
                                            label: strings.currentUsername,
                                            type: "username",
                                            value: currentUsername,
                                            autoComplete: "current-username",
                                            required: true,
                                        },
                                        {
                                            id: "currentPassword",
                                            label: strings.currentPassword,
                                            type: "password",
                                            value: currentPassword,
                                            autoComplete: "current-password",
                                            required: true,
                                        },
                                        {
                                            id: "newUsername",
                                            label: strings.newUsername,
                                            type: "username",
                                            value: newUsername,
                                            autoComplete: "new-username",
                                            required: true,
                                        },
                                        {
                                            id: "newPassword",
                                            label: strings.newPassword,
                                            type: "password",
                                            value: newPassword,
                                            autoComplete: "new-password",
                                            required: true,
                                        },
                                        {
                                            id: "newPasswordVerify",
                                            label: strings.newPasswordVerify,
                                            type: "password",
                                            value: newPasswordVerify,
                                            autoComplete: "new-password",
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
                                    text={strings.confirmarChangeLogin}
                                />
                            </CardActions>
                        </form>
                    </Card>
                </Container>
            </>
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
    ) => dispatch(modifyLogin(currentUsername, currentPassword, newUsername, newPassword)),
    clearModifyLogin: () => dispatch(clearModifyLogin)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChangeLogin))