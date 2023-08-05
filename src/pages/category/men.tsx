import React from 'react'
import { Typography } from '@mui/material'
import { ShopLayout } from '../../../components/layouts'
import { FullScreanLoading } from '../../../components/ui'
import { ProductList } from '../../../components/products'
import { useProducts } from '../../../hooks'

const MenPage = () => {

    const {products, isLoading} = useProducts('/products?gender=men');

    return (
        <ShopLayout title={'TesloShop - Men´s'} pageDescription={'Encuentra los mejores productos de TesloShop para hombres'} >
            <Typography variant='h1' component='h1'>Hombres</Typography>
            <Typography variant='h2' sx={{ mb:1 }}>Productos para hombres</Typography>

            {
                isLoading
                ? <FullScreanLoading />
                : <ProductList products={ products } />
            }

        </ShopLayout>
    )
}

export default MenPage