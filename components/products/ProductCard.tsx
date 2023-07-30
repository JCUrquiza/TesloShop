import { FC, PropsWithChildren, useState, useMemo } from 'react';
import NextLink from 'next/link';
import { Grid, CardActionArea, CardMedia, Card, Box, Typography, Link } from '@mui/material';
import { IProduct } from '../../interfaces';

interface Props{
  product: IProduct
}

export const ProductCard: FC<PropsWithChildren<Props>> = ({ product }) => {

  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `products/${ product.images[1] }`
      : `products/${ product.images[0] }`
  }, [isHovered, product.images])
  
  return (
    <Grid 
      item 
      xs={6} 
      sm={4}
      onMouseEnter={ () => setIsHovered(true) }
      onMouseLeave={ () => setIsHovered(false) }
    >
      <Card>
        <NextLink href="/product/slug" passHref prefetch={ false } legacyBehavior>
          <Link>
            <CardActionArea>
              <CardMedia
                className='fadeIn'
                component='img'
                image={productImage}
                alt={product.title}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1 }} className='fadeIn'>
        <Typography fontWeight={700}>{ product.title }</Typography>
        <Typography fontWeight={500}>{ `$${product.price}` }</Typography>
      </Box>

    </Grid>
  )
}