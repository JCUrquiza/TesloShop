import React from 'react'
import { Typography } from '@mui/material'
import { ShopLayout } from '../../../components/layouts'
import { FullScreanLoading } from '../../../components/ui'
import { ProductList } from '../../../components/products'
import { useProducts } from '../../../hooks'

const KidPage = () => {

    const {products, isLoading} = useProducts('/products?gender=kid');

    return (
        <ShopLayout title={'TesloShop - Kids'} pageDescription={'Encuentra los mejores productos de TesloShop para niños'} >
            <Typography variant='h1' component='h1'>Niños</Typography>
            <Typography variant='h2' sx={{ mb:1 }}>Productos para niños</Typography>

            {
                isLoading
                ? <FullScreanLoading />
                : <ProductList products={ products } />
            }

        </ShopLayout>
    )
}

export default KidPage