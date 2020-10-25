import { Checkbox, Switch, TextField, withStyles } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeAlarma, changeOnOff, changeValor, submitChanges } from '../store/data/actions'
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


function trasponer(valoresAct, columns, handlerTexto, handlerAlarma, handlerOnOff) {
    const rows = []
    columns.forEach(({ id, button, label, minVal, maxVal, alarma }) => {
        const row = {
            label,
            code: id
        }
        if (!button) {
            row.value = valoresAct[id]
            row.minVal = <CeldaTexto
                id={id}
                value={minVal}
                type="number"
                handler={e => handlerTexto(e, "minVal")}
            />
            row.maxVal = <CeldaTexto
                id={id}
                value={maxVal}
                type="number"
                handler={e => handlerTexto(e, "maxVal")}
            />
            row.alarma = <Checkbox
                id={id}
                color="secondary"
                checked={alarma}
                onChange={handlerAlarma}
            />
        } else {
            row.value = <Switch
                id={id}
                checked={valoresAct[id] == "on"}
                onChange={handlerOnOff}
                color="secondary"
            />
        }
        rows.push(row)
    });
    return rows
}

class Resumen extends Component {
    constructor(props) {
        super(props)
        this.handlerValorChange = this.handlerValorChange.bind(this)
        this.handleAlarmaChange = this.handleAlarmaChange.bind(this)
        this.handleOnOff = this.handleOnOff.bind(this)
    }

    handlerValorChange(e, campo) {
        const { id, value } = e.target
        this.props.changeValor(id, campo, parseFloat(value) || 0)
    }

    handleAlarmaChange(e) {
        this.props.changeAlarma(e.target.id)
    }

    handleOnOff(e) {
        this.props.changeOnOff(e.target.id)
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
                        this.handleAlarmaChange,
                        this.handleOnOff
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
    changeValor: (id, campo, valor) => dispatch(changeValor(id, campo, valor)),
    changeAlarma: id => dispatch(changeAlarma(id)),
    changeOnOff: id => dispatch(changeOnOff(id)),
    submitChanges: () => dispatch(submitChanges())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Resumen));

