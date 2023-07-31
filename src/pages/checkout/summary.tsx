import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link } from '@mui/material';
import { ShopLayout } from '../../../components/layouts';
import { CartList, OrderSummary } from '../../../components/cart';

const SummaryPage = () => {
    return (
        <ShopLayout title='Resumen de la orden' pageDescription={'Resumen de la orden'}>
            <Typography variant='h1' component='h1'>Resumen</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen (3 productos)</Typography>
                            
                            <Divider sx={{my:1}} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>Juan Carlos González</Typography>
                            <Typography>323 Algún Lugar</Typography>
                            <Typography>Visha Olímpica</Typography>
                            <Typography>México</Typography>
                            <Typography>+1 5566 7263 9182</Typography>

                            <Divider sx={{my:1}} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            
                            <OrderSummary />

                            <Box sx={{mt:3}}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirmar Orden
                                </Button>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export default SummaryPage;

