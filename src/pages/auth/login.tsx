import React from 'react'
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import AuthLayout from '../../../components/layouts/AuthLayout'

const LoginPage = () => {
  return (
    <AuthLayout title={'Ingresar'}>

        <Box sx={{ width: 350, padding: '10px 20px' }}>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Correo" variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Contraseña" variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button className='circular-btn' color='secondary' size='large' fullWidth>
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href='/auth/register' passHref legacyBehavior>
                        <Link underline='always'>
                            ¿No tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>

            </Grid>

        </Box>

    </AuthLayout>
  )
}

export default LoginPage;
