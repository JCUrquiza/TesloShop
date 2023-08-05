import React from 'react'
import { Typography } from '@mui/material'
import { ShopLayout } from '../../../components/layouts'
import { FullScreanLoading } from '../../../components/ui'
import { ProductList } from '../../../components/products'
import { useProducts } from '../../../hooks'

const WomenPage = () => {

    const {products, isLoading} = useProducts('/products?gender=women');

    return (
        <ShopLayout title={'TesloShop - Kids'} pageDescription={'Encuentra los mejores productos de TesloShop para mujeres'} >
            <Typography variant='h1' component='h1'>Mujeres</Typography>
            <Typography variant='h2' sx={{ mb:1 }}>Productos para mujeres</Typography>

            {
                isLoading
                ? <FullScreanLoading />
                : <ProductList products={ products } />
            }

        </ShopLayout>
    )
}

export default WomenPage