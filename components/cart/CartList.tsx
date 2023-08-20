import { FC, PropsWithChildren, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';

interface Props{
    editable?: boolean;
}

export const CartList: FC<PropsWithChildren<Props>> = ({editable = false}) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }

    return (
        <>
            {
                cart.map( product => (
                    <Grid container key={ product.slug + product.size } spacing={2} sx={{mb:1}}>
                        <Grid item xs={3}>
                            {/* TODO: Llevar a la página del producto */}
                            <NextLink href={`/product/${ product.slug }`} passHref legacyBehavior>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.images}`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Talla: <strong>{ product.size }</strong></Typography>

                                {/* Conditional */}
                                {
                                    editable
                                    ? (
                                        <ItemCounter 
                                            currentValue={ product.quantity }
                                            maxValue={ 10 }
                                            updateQuantity={(value) => onNewCartQuantityValue(product, value)}
                                        />
                                    ) 
                                    : (
                                        <Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'productos' : 'producto' }</Typography>
                                    )
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                            {/* Editable */}
                            {
                                editable &&
                                (
                                    <Button variant='text' color='secondary' onClick={() => removeCartProduct(product)}>
                                        Remover
                                    </Button>    
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
