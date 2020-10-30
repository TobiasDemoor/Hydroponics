import {
    Button,
    CircularProgress, Container, IconButton, Typography, withStyles
} from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BackIcon from '@material-ui/icons/ArrowBack'
import { getRecent } from '../../store/data/actions'
import DataTable from '../common/DataTable'
import NavBar from '../common/NavBar';
import Resumen from './Resumen';

const styles = theme => ({
    container: {
        // marginTop: theme.spacing(4)
        // display: 'flex',
        // justifyContent: 'center'
    },
    elements: {
        marginTop: theme.spacing(4)
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
        this.state = {
            resumen: true
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.changeView = this.changeView.bind(this)
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getRecent(id)
    }

    changeView() {
        this.setState({resumen: !this.state.resumen})
    }

    render() {
        const { classes, isFetching, error, columns, rows } = this.props;
        const {resumen} = this.state;
        return (
            <div>
                <NavBar>
                    <IconButton
                        edge="start"
                        onClick={() => this.props.history.push('/')}
                    >
                        <BackIcon color="primary" size="medium" />
                    </IconButton>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.changeView}
                        style={{ marginLeft: 'auto' }}
                    >
                        Change View
                    </Button>
                </NavBar>
                <Container className={classes.container} maxWidth="lg">
                    {isFetching && <CircularProgress color="primary" />}
                    {error &&
                        <Typography
                            className={`${classes.spaced} ${classes.error}`}
                        >
                            {error}
                        </Typography>
                    }
                    {columns && (
                        <div className={classes.elements}>
                            { resumen ?
                                <Resumen />
                                :
                                <DataTable
                                    rows={rows}
                                    columns={columns}
                                />
                            }
                        </div>
                    )}
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
