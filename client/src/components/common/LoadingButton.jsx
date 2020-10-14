import React from 'react'
import { Button, CircularProgress } from "@material-ui/core"

export default function LoadingButton({loading, text, ...params }) {
    return (
        <Button disabled={loading} {...params}>
            {loading && <CircularProgress />}
            {!loading && (text || "Confirmar")}
        </Button>
    )
}