import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecent } from '../store/data/actions'
import DataTable from './common/DataTable'


class PruebaRecientes extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        this.props.getRecent()
    }
    render() {
        const {columns, rows} = this.props;
        if (!columns) return <div></div>
        return (
            <DataTable 
                rows = {rows[0]}
                columns = {columns}
            />
        )
    }
}

const mapStateToProps = state => ({
    columns: state.data.columns,
    rows: state.data.rows
})

const mapDispatchToProps = dispatch => ({
    getRecent : () => dispatch(getRecent())
})

export default connect(mapStateToProps, mapDispatchToProps)(PruebaRecientes);
