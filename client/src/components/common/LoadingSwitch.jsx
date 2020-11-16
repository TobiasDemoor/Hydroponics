import { CircularProgress, Switch } from '@material-ui/core'
import React from 'react'

export default function LoadingSwitch({ loading, id, checked, onChange, color }) {
    if (!loading) {
        return (
            <Switch
                key={`switch${id}`}
                id={id}
                checked={checked}
                onChange={onChange}
                color={color}
            />
        )
    } else {
        return (
            <CircularProgress
                key={`circular${id}`}
                color={color}
                size={32}
            />
        )
    }
}
