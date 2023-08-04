import { NextPage } from 'next';
import { Typography} from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreanLoading } from '../../components/ui';

const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'TesloShop - Home'} pageDescription={'Encuentra los mejores productos de TesloShop'} >
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb:1 }}>Todos los productos</Typography>

      {
        isLoading
          ? <FullScreanLoading />
          : <ProductList products={ products } />
      }


    </ShopLayout>
  )
}

export default HomePage;
