import { Checkbox, TextField, withStyles } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeAlarma, changeValor, submitChanges } from '../store/data/actions'
import DataTable from './common/DataTable';
import LoadingButton from './common/LoadingButton';

const styles = theme => ({
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

class Resumen extends Component {
    constructor(props) {
        super(props)
        this.handleAlarmaChange = this.handleAlarmaChange.bind(this)
        this.handlerValorChange = this.handlerValorChange.bind(this)
    }

    handleAlarmaChange(e) {
        this.props.changeAlarma(e.target.id)
    }

    handlerValorChange(e, campo) {
        const { id, value } = e.target
        this.props.changeValor(id, campo, parseFloat(value) || 0)
    }
    render() {
        const { classes, columns, rows, modified, isPushing } = this.props;
        return (
            <div>
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
                {modified && (
                    <LoadingButton
                        className={classes.button}
                        loading={isPushing}
                        onClick={this.props.submitChanges}
                        variant="contained"
                        text="Guardar Cambios"
                        color="primary"
                    />
                )}
            </div >
        )
    }
}

const mapStateToProps = state => ({
    columns: state.data.columns,
    rows: state.data.rows,
    modified: state.data.modified,
    isPushing: state.data.isPushing
})

const mapDispatchToProps = dispatch => ({
    changeAlarma: id => dispatch(changeAlarma(id)),
    changeValor: (id, campo, valor) => dispatch(changeValor(id, campo, valor)),
    submitChanges: () => dispatch(submitChanges())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Resumen));

