import { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Chip, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { SearchOutlined } from '@mui/icons-material';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Nombre Completo', width: 300 },
    { 
        field: 'paid',
        headerName: 'Estado',
        description: 'Muestra informacion de la orden, si está pagada o no',
        width: 150,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return params.row.paid
                ? <Chip color='success' label='Pagado' variant ='outlined'/>
                : <Chip color='error' label='Pendiente' variant='outlined'/>

        }
    },
    {
        field: 'order',
        headerName: 'Ver orden',
        width: 150,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            const url = `/orders/${params.row.id}`
            return (
                <Link href={url} style={{color: 'gray'}}>
                    <SearchOutlined />
                </Link>
            )
        }

        
    }
];

const rows = [
    { id: 1, paid: true, fullName: 'Stanly Calle' },
    { id: 2, paid: false, fullName: 'Juanita Arango' },
    { id: 3, paid: true, fullName: 'Juan Mendoza' },
    { id: 4, paid: false, fullName: 'Ruben Calle' },
    { id: 5, paid: true, fullName: 'Natalia Herrera' },

]


const HistoryPage: NextPage = () => {

   return (
      <ShopLayout title='Historial de ordenes' description='Historial de ordenes del cliente'>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

            <Grid container marginTop={2}>
                <Grid item xs={12} sx={{ height: 650, width: '100%'}}>
                    <DataGrid 
                        rows={ rows }
                        columns= { columns }
                        pageSize={ 10 }
                        rowsPerPageOptions= { [10] }
                    />

                </Grid>
            </Grid>
         
      </ShopLayout>
   )
}


export default HistoryPage