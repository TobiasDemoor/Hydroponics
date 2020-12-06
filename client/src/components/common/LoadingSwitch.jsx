import { CircularProgress, Switch } from '@material-ui/core'
import React from 'react'

export default function LoadingSwitch({ loading, id, color, ...props }) {
    if (!loading) {
        return (
            <Switch
                key={`switch${id}`}
                id={id}
                color={color}
                {...props}
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
