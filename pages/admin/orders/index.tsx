import { ConfirmationNumberOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IOrder } from '../../../interfaces/order';
import { IUser } from '../../../interfaces/user';
import { currency } from '../../../utils';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'Orden ID', width: 250 },
  { field: 'email', headerName: 'Correo', width: 250 },
  { field: 'name', headerName: 'Nombre Completo', width: 200 },
  {
    field: 'total',
    headerName: 'Monto total',
  },
  {
    field: 'isPad',
    headerName: 'Pagada',
    description: "Muestra informacion de la orden, si está pagada o no",
    sortable: false,
    width: 120,
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid
        ? <Chip color="success" label="Pagado" variant="outlined" />
        : <Chip color="error" label="Pendiente" variant="outlined" />
    }
  },
  { field: 'inStock', headerName: 'N° Productos', align: 'center' },
  {
    field: 'check',
    headerName: 'Ver orden',
    align: 'center',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={ `/admin/orders/${ row.id }` } target="_blank" rel="noreferrer" style={{color: '#002'}}>
          <RemoveRedEyeOutlined />
        </a>
      )
    }
  },
]


const OrdersPage = () => {

  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if (!data && !error) return (<></>)
  console.log({data})

  const rows = data!.map(order => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: `${(order.user as IUser).name} ${(order.user as IUser).lastname || ''}`,
    total: currency.format(order.cartSummary.total),
    isPaid: order.isPaid,
    inStock: order.cartSummary.numberOfItems,
  }))

  return (
    <AdminLayout
      pageTitle='Ordenes | Panel Admin | Muscle Home'
      pageDescription='Panel de administración de ordenes de Muscle Home'
      title='Ordenes'
      subTitle='Mantenimiento de ordenes'
      icon={<ConfirmationNumberOutlined />}
  >
      <Grid container marginTop={2} className='fadeIn'>
        <Grid item xs={12} sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[10, 20, 30]}
          />
        </Grid>
        </Grid>
    </AdminLayout>
  )
}
export default OrdersPage