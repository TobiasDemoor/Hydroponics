import { CircularProgress, Container, IconButton, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BackIcon from '@material-ui/icons/ArrowBack'
import { getRecent } from '../store/data/actions'
import DataTable from './common/DataTable'
import NavBar from './common/NavBar';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    message: {
        marginBottom: theme.spacing(4)
    },
    success: {
        color: theme.palette.success.main
    },
    error: {
        color: theme.palette.error.main
    }
})

class Recientes extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getRecent(id)
    }
    render() {
        const { classes, isFetching, error, columns, rows } = this.props;
        return (
            <div>
                <NavBar>
                    <IconButton edge="start" onClick={() => this.props.history.push('/')}>
                        <BackIcon color="primary" size="medium" />
                    </IconButton>
                </NavBar>
                <Container className={classes.container} maxWidth="lg">
                    {isFetching && <CircularProgress color="primary"/>}
                    {error &&
                        <div className={classes.message}>
                            <Typography
                                className={classes.error}
                                variant="h7"
                            >
                                {error}
                            </Typography>
                        </div>
                    }
                    {columns &&
                        <DataTable
                            rows={rows}
                            columns={columns}
                        />
                    }
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isFetching: state.data.isFetching,
    error: state.data.error,
    columns: state.data.columns,
    rows: state.data.rows
})

const mapDispatchToProps = dispatch => ({
    getRecent: id => dispatch(getRecent(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Recientes));
