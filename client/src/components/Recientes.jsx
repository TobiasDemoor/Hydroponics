import {
    Checkbox, CircularProgress, Container, IconButton, TextField, Typography, withStyles
} from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BackIcon from '@material-ui/icons/ArrowBack'
import { changeAlarma, changeValor, getRecent } from '../store/data/actions'
import DataTable from './common/DataTable'
import NavBar from './common/NavBar';
import LoadingButton from './common/LoadingButton';

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
    },
    button: {
        margin: theme.spacing(2),
        float: 'right'
    }
})

function CeldaTexto({ handler, ...props }) {
    return <TextField
        {...props}
        onChange={handler}
        fullWidth
        InputProps={{ disableUnderline: true }}
        inputProps={{
            style: { textAlign: 'center' },
            step: 0.01
        }}
    />
}


function trasponer(row, columns, handlerTexto, handlerAlarma) {
    const rows = []
    columns.forEach(({ id, label, minVal, maxVal, alarma }) => {
        rows.push({
            label,
            value: row[id],
            minVal: <CeldaTexto
                id={id}
                value={minVal}
                type="number"
                handler={e => handlerTexto(e, "minVal")}
            />,
            maxVal: <CeldaTexto
                id={id}
                value={maxVal}
                type="number"
                handler={e => handlerTexto(e, "maxVal")}
            />,
            alarma: <Checkbox id={id} color="secondary" checked={alarma} onChange={handlerAlarma} />,
            code: id
        })
    });
    return rows
}

class Recientes extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleAlarmaChange = this.handleAlarmaChange.bind(this)
        this.handlerValorChange = this.handlerValorChange.bind(this)
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getRecent(id)
    }

    handleAlarmaChange(e) {
        this.props.changeAlarma(e.target.id)
    }

    handlerValorChange(e, campo) {
        const { id, value } = e.target
        this.props.changeValor(id, campo, parseFloat(value) || 0)
    }

    render() {
        const { classes, isFetching, error, columns, rows, modified } = this.props;
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
                        <DataTable
                            rowsPerPageOptions={[100]}
                            columns={[
                                { label: "Titulo", id: "label", align: "center" },
                                { label: "Valor", id: "value", align: "center" },
                                { label: "MinVal", id: "minVal", align: "center" },
                                { label: "MaxVal", id: "maxVal", align: "center" },
                                { label: "Alarma", id: "alarma", align: "center", padding: "checkbox" }
                            ]}
                            rows={trasponer(
                                rows[0],
                                columns.slice(1),
                                this.handlerValorChange,
                                this.handleAlarmaChange
                            )}
                        />
                    }
                    {modified && (
                            <LoadingButton
                                className={classes.button}
                                variant="contained"
                                text="Guardar Cambios"
                                color="primary"
                            />
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
    modified: state.data.modified
})

const mapDispatchToProps = dispatch => ({
    getRecent: id => dispatch(getRecent(id)),
    changeAlarma: id => dispatch(changeAlarma(id)),
    changeValor: (id, campo, valor) => dispatch(changeValor(id, campo, valor))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Recientes));
