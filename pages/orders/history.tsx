import { NextPage, GetServerSideProps } from "next";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chip, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { SearchOutlined } from "@mui/icons-material";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from '../../interfaces/order';



interface Props {
  orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullName: `${order.shippingAddress.name} ${order.shippingAddress.lastname}`,
    orderid: order._id,
  }))

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fullName", headerName: "Nombre Completo", width: 300 },
    {
      field: "paid",
      headerName: "Estado",
      description: "Muestra informacion de la orden, si está pagada o no",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return params.row.paid
          ? <Chip color="success" label="Pagado" variant="outlined" />
          : <Chip color="error" label="Pendiente" variant="outlined" />
      },
    },
    {
      field: "order",
      headerName: "Ver orden",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const url = `/orders/${params.row.orderid}`;
        return (
          <Link href={url} style={{ color: "gray" }}>
            <SearchOutlined />
          </Link>
        );
      },
    },
  ];
  

  return (
    <ShopLayout
      title="Historial de ordenes"
      description="Historial de ordenes del cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container marginTop={2} className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=orders/history',
        permanent: false,
      }
    }
  }

  const orders = await dbOrders.getOrdersByUser( session.user.id )

  return {
    props: {
      orders
    }
  }
}