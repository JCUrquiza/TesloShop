import { FC, PropsWithChildren, useState, useMemo } from 'react';
import NextLink from 'next/link';
import { Grid, CardActionArea, CardMedia, Card, Box, Typography, Link, Chip } from '@mui/material';
import { IProduct } from '../../interfaces';

interface Props{
  product: IProduct
}

export const ProductCard: FC<PropsWithChildren<Props>> = ({ product }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setisImageLoaded] = useState(false);  

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${ product.images[1] }`
      : `/products/${ product.images[0] }`
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
        <NextLink href={`/product/${ product.slug }`} passHref prefetch={ false } legacyBehavior>
          <Link>
            <CardActionArea>

              {
                (product.inStock === 0) && (
                  <Chip 
                    color='primary'
                    label='No hay disponibles'
                    sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                  />
                )
              }

              <CardMedia
                className='fadeIn'
                component='img'
                image={productImage}
                alt={product.title}
                onLoad={ () => setisImageLoaded(true) }
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
        <Typography fontWeight={700}>{ product.title }</Typography>
        <Typography fontWeight={500}>${ product.prices }</Typography>
      </Box>

    </Grid>
  )
}
