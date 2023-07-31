import React from 'react'
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import NextLink from 'next/link';
import { ShopLayout } from '../../../components/layouts';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Nombre Completo', width: 300 },

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información se está pagada la orden o no',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined' />
                    : <Chip color='error' label='No Pagada' variant='outlined' />
            )
        }
    },

    {
        field: 'orden',
        headerName: 'Ver Orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver Orden
                    </Link>
                </NextLink>
            )
        }
    }
];

const rows = [
    { id: 1, paid: true, fullName: 'Juan Carlos', details: 'Go' },
    { id: 2, paid: false, fullName: 'Melissa Flores', details: 'Go' },
    { id: 3, paid: true, fullName: 'Fernando Vallejo', details: 'Go' },
    { id: 4, paid: false, fullName: 'Bere Santos', details: 'Go' },
    { id: 5, paid: true, fullName: 'Natalia Herrera', details: 'Go' }
];

const history = () => {
    return (
        <ShopLayout title='Historial de órdenes' pageDescription='Historial de Ordenes de cliente'>
            <Typography variant='h1' component='h1'>Historial de órdenes</Typography>

            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width:'100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: { 
                                paginationModel: { pageSize: 5 } 
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export default history