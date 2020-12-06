import { TextField } from '@material-ui/core'
import React from 'react'

export default function FormFields({ campos, ...props }) {
    return (
        < >
            {campos.map((campo, index) =>
                <TextField {...campo} {...props} key={index} />
            )}
        </ >
    )
}
