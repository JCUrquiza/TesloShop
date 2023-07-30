import { Grid, Typography } from '@mui/material'
import React from 'react'

export const OrderSummary = () => {
    return (
        <Grid container>

            <Grid item xs={6}>
                <Typography>No. Products</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{`$${156.55}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos (15%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{`$${35.34}`}</Typography>
            </Grid>

            <Grid item xs={6} sx={{mt:2}}>
                <Typography variant='subtitle1'>Total a pagar</Typography>
            </Grid>
            <Grid item xs={6} sx={{mt:2}} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>{`$${196.55}`}</Typography>
            </Grid>

        </Grid>
        
    )
}
