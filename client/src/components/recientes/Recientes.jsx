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
import { changeResumen } from '../../store/view';
import { ErrorMessage } from '../common/messages';

const { changeView } = require('../../config').strings

const styles = theme => ({
    container: {
        position: 'relative'
    },
    loading: {
        marginLeft: "50%",
        left: -20
    },
    elements: {
        marginTop: theme.spacing(4)
    },
})



class Recientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resumen: true
        }
        this.changeView = this.changeView.bind(this)
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getRecent(id)
    }

    changeView() {
        this.setState({ resumen: !this.state.resumen })
    }

    render() {
        const { classes, isFetching, error, columns, rows, resumen } = this.props;
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
                        onClick={this.props.changeResumen}
                        style={{ marginLeft: 'auto' }}
                    >
                        {changeView}
                    </Button>
                </NavBar>
                <Container className={classes.container} maxWidth="lg">
                    <ErrorMessage error={error} />
                    {!isFetching && columns ?
                        <div className={classes.elements}>
                            {resumen ?
                                <Resumen />
                                :
                                <DataTable
                                    rows={rows}
                                    columns={columns}
                                />
                            }
                        </div>
                    :
                    <CircularProgress className={classes.loading} color="primary" />
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
    resumen: state.view.resumen,
})

const mapDispatchToProps = dispatch => ({
    getRecent: id => dispatch(getRecent(id)),
    changeResumen: () => dispatch(changeResumen())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Recientes));
