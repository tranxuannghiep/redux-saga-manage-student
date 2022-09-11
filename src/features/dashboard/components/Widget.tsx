import * as React from 'react';
import { Paper, Box } from '@mui/material';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`
    }
}))

export interface WidgetProps {
    title: string;
    children: any
}

export default function Widget({ title, children }: WidgetProps) {
    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <Typography variant='button' align='center' display='block'>{title}</Typography>
            <Box mt={2}>{children}</Box>
        </Paper>
    );
}
