import {
    CircularProgress, Container, IconButton, Typography, withStyles
} from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BackIcon from '@material-ui/icons/ArrowBack'
import { changeAlarma, changeValor, getRecent } from '../store/data/actions'
import DataTable from './common/DataTable'
import NavBar from './common/NavBar';
import Resumen from './Resumen';

const styles = theme => ({
    container: {
        // display: 'flex',
        // justifyContent: 'center'
    },
    spaced: {
        marginBottom: theme.spacing(4)
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
        const id = this.props.match.params;
        return (
            <div>
                <NavBar>
                    <IconButton edge="start" onClick={() => this.props.history.push('/')}>
                        <BackIcon color="primary" size="medium" />
                    </IconButton>
                </NavBar>
                <Container className={classes.container} maxWidth="lg">
                    {isFetching && <CircularProgress color="primary" />}
                    {error &&
                        <Typography
                            className={`${classes.spaced} ${classes.error}`}
                            variant="h7"
                        >
                            {error}
                        </Typography>
                    }
                    {columns &&
                        // <DataTable
                        //     rows={rows}
                        //     columns={columns}
                        // />
                        <Resumen/>
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
    rows: state.data.rows,
})

const mapDispatchToProps = dispatch => ({
    getRecent: id => dispatch(getRecent(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Recientes));
