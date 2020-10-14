import React from 'react'
import { Button, CircularProgress } from "@material-ui/core"

export default function LoadingButton({loading, color="primary", text, ...params }) {
    return (
        <Button color disabled={loading} {...params}>
            {loading && <CircularProgress color/>}
            {!loading && (text || "Confirmar")}
        </Button>
    )
}