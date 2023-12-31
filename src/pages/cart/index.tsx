import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartContext } from '../../../context';
import { ShopLayout } from '../../../components/layouts';
import { CartList, OrderSummary } from '../../../components/cart';

const CartPage = () => {

    const { isLoaded, cart } = useContext( CartContext );
    const router = useRouter();

    useEffect(() => {
        if ( isLoaded && cart.length === 0 ) {
            router.replace('/cart/empty');
        }
    }, [ isLoaded, cart, router ])

    // Para evitar renderizar innecesariamente:
    if ( !isLoaded || cart.length === 0 ) {
        return (<></>);
    }

    return (
        <ShopLayout title='Carrito' pageDescription={'Carrito de compras de la tienda'}>
            <Typography>Carrito</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>
                            
                            <Divider sx={{my:1}} />
                            {/* OrdenSummary */}
                            <OrderSummary />

                            <Box sx={{mt:3}}>
                                <Button 
                                    color='secondary' 
                                    className='circular-btn' 
                                    fullWidth 
                                    onClick={ () => {router.push('/checkout/summary')} }
                                >
                                    Checkout
                                </Button>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export default CartPage;

