import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { Button, CardMedia, Grid, capitalize } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IProduct } from '../../../interfaces';
import NextLink from 'next/link';


const columns: GridColDef[] = [
  { 
    field: 'img', 
    headerName: 'Imagen',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${ row.slug }`} target='_blank' rel="noreferrer">
          <CardMedia 
            component='img'
            className='fadeIn'
            image={ `/products/${ row.img }` }
          />
        </a>
      )
    }
  },
  { 
    field: 'title', 
    headerName: 'Título', 
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink style={{color: 'inherit'}} href={`/admin/products/${ row.slug }`}>
          { row.title }
        </NextLink>
      )
    }
  },
  { field: 'gender', headerName: 'Género' },
  { field: 'type', headerName: 'Tipo' },
  { field: 'instock', headerName: 'Inventario' },
  { field: 'price', headerName: 'Precio' },
  { field: 'sizes', headerName: 'Tallas', width: 200 },
]


const ProductsPage = () => {

  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if (!data && !error) return (<></>)

  const rows = data!.map(product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: capitalize(product.gender),
    type: capitalize(product.type),
    instock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(", "),
    slug: product.slug,
  }))

  return (
    <AdminLayout
      pageTitle={`Productos (${data?.length}) | Panel Admin | Muscle Home'`}
      pageDescription='Panel de mantenimiento de productos de Muscle Home'
      title='Productos'
      subTitle='Mantenimiento de productos'
      icon={<CategoryOutlined />}
  >
      <Grid container marginTop={2} className='fadeIn'>
        <Grid item xs={12} display='flex' justifyContent='end' sx={{ mb: 2 }}>
          <Button
            startIcon={ <AddOutlined /> }
            color='secondary'
            href='/admin/products/new'
          >
            Crear producto
          </Button>
        </Grid>
        <Grid item xs={12}  sx={{ height: 800, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoPageSize
          />
        </Grid>
        </Grid>
    </AdminLayout>
  )
}
export default ProductsPage