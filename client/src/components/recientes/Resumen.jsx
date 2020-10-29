import { withStyles } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeAlarma, changeOnOff, changeValor, submitChanges } from '../../store/data/actions'
import TablaControles from './TablaControles';
import TablaResumen from './TablaResumen';

const config = require("../../config")
const {actuator, sensor} = config.constants.types

const styles = theme => ({
    elements: {
        marginBottom: theme.spacing(4)
    },
    button: {
        margin: theme.spacing(2),
        float: 'right'
    }
})


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
        const { classes, columns, rows, modified, isPushing, excecuting } = this.props;
        const valoresAct = rows[0];
        return (
            <div>
                <div className={classes.elements}>
                    <TablaResumen
                        columns={columns.filter(c => c.type === sensor)}
                        handlerTexto={this.handlerValorChange}
                        handlerAlarma={this.handleAlarmaChange}
                        isPushing={isPushing}
                        submitChanges={this.props.submitChanges}
                        classes={classes}
                        modified={modified}
                        valoresAct={valoresAct}
                    />
                </div>
                <TablaControles
                    columns={columns.filter(c => c.type === actuator)}
                    handlerOnOff={this.handleOnOff}
                    valoresAct={valoresAct}
                    excecuting={excecuting}
                />
            </div >
        )
    }
}

const mapStateToProps = state => ({
    columns: state.data.columns,
    rows: state.data.rows,
    modified: state.data.modified,
    isPushing: state.data.isPushing,
    excecuting: state.data.excecuting
})

const mapDispatchToProps = dispatch => ({
    changeValor: (id, campo, valor) => dispatch(changeValor(id, campo, valor)),
    changeAlarma: id => dispatch(changeAlarma(id)),
    changeOnOff: id => dispatch(changeOnOff(id)),
    submitChanges: () => dispatch(submitChanges())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Resumen));
