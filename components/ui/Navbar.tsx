import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Link, Typography, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { CartContext, UIContext } from '../../context';

export const Navbar = () => {

    const router = useRouter();
    const activeLink = (href: string) => href === router.asPath ? 'primary' : 'info';

    const { toggleSideMenu } = useContext(UIContext);
    const { numberOfItems } = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        router.push(`/search/${ searchTerm }`);
    }

    return (
        <AppBar>
            <Toolbar>

                <NextLink href='/' passHref legacyBehavior>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo</Typography>
                        <Typography sx={{ ml:0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />

                <Box sx={{ display: isSearchVisible ? 'none' : {xs: 'none', sm: 'block'} }} className='fadeIn'>
                    <NextLink href='/category/men' passHref legacyBehavior>
                        <Link>
                            <Button color={activeLink('/category/men')}>Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref legacyBehavior>
                        <Link>
                            <Button color={activeLink('/category/women')}>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kid' passHref legacyBehavior>
                        <Link>
                            <Button color={activeLink('/category/kid')}>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1} />

                {/* Pantallas Grandes */}
                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{ display: {xs: 'none', sm: 'flex'} }}
                                className='fadeIn'
                                autoFocus
                                value={searchTerm}
                                onChange={ (e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && onSearchTerm()}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsSearchVisible(false)}
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                          )
                        : (
                            <IconButton
                                className='fadeIn'
                                onClick={() => setIsSearchVisible(true)}
                                sx={{ display: {xs: 'none', sm: 'flex'} }}
                            >
                                <SearchOutlined />
                            </IconButton>
                          )
                }

                {/* Pantallas Pequeñas */}
                <IconButton
                    sx={{ display:  {xs: 'flex', sm: 'none'} }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref legacyBehavior>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ numberOfItems > 9 ? '+9' : numberOfItems } color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={toggleSideMenu}>Menu</Button>

            </Toolbar>
        </AppBar>
    )
}

