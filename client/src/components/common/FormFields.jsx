import { TextField } from '@material-ui/core'
import React from 'react'

export default function FormFields({ campos, className, onChange, fullWidth }) {
    return (
        <div>
            {campos.map(campo => {
                return (
                    <TextField
                        className={className}
                        {...campo}
                        key={campo.id || JSON.stringify(campo)}
                        fullWidth={fullWidth}
                        onChange={onChange}
                    />
                )
            })}
        </div>
    )
}
