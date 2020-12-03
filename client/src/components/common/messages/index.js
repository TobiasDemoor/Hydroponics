import { Typography, withStyles } from '@material-ui/core'
import React from 'react'

const styles = theme => ({
    spaced: {
        marginBottom: theme.spacing(4)
    },
    success: {
        color: theme.palette.success.main
    },
    error: {
        color: theme.palette.error.main
    },
    title: {
        marginBottom: theme.spacing(4),
        color: theme.palette.text.primary
    }
})


export const SuccessMessage = withStyles(styles)(
    ({ message, classes, ...props }) => {
        if (message) {
            return (
                <Typography
                    className={`${classes.spaced} ${classes.success}`}
                    {...props}
                >
                    {message}
                </Typography>
            )
        } else {
            return null
        }
    }
)

export const ErrorMessage = withStyles(styles)(
    ({ error, classes, ...props }) => {
        if (error) {
            return (
                <Typography
                    className={`${classes.spaced} ${classes.error}`}
                    {...props}
                >
                    {error}
                </Typography>
            )
        } else {
            return null
        }
    }
)

export const Title = withStyles(styles)(
    ({ text, classes, ...props }) => {
        return (
            <Typography className={classes.title} variant="h4" align="center" {...props}>
                {text}
            </Typography>
        )
    }
)
