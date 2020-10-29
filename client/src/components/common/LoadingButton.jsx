import React from 'react'
import { Button, CircularProgress } from "@material-ui/core"
const strings = require("../../config").strings

export default function LoadingButton({loading, text, ...params }) {
    return (
        <Button disabled={loading} {...params}>
            {loading && <CircularProgress size={24}/>}
            {!loading && (text || strings.confirmar)}
        </Button>
    )
}