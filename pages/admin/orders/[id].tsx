import { NextPage, GetServerSideProps } from "next";

import { Typography, Grid, Card, CardContent, Divider, Box, Chip } from "@mui/material";
import { CreditScoreOutlined, CreditCardOffOutlined, ConfirmationNumberOutlined  } from "@mui/icons-material";
import { IOrder } from "../../../interfaces";
import { AdminLayout } from "../../../components/layouts";
import { CartList, OrderSummary } from "../../../components/cart";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../../database";


interface Props {
  order: IOrder,
}

const OrderPage: NextPage<Props> = ({ order }) => {

  const { cartSummary, isPaid, orderItems, shippingAddress, _id } = order;
  const { numberOfItems } = cartSummary
  const { address, city, country, lastname, name, phone, zip, address2 } = shippingAddress;

  return (
     <AdminLayout
      pageTitle={`Orden #${order._id} | Panel Admin | Muscle Home`}
      pageDescription='Panel de administración de ordenes de Muscle Home'
      title='Ordenes'
      subTitle='Detalles de orden'
      icon={<ConfirmationNumberOutlined />}
    >
      <Typography variant="h1" component="h1" marginBottom={2}>
        Orden N°: { _id }
      </Typography>

      <Grid container spacing={2} className='fadeIn'>
        <Grid item xs={12} md={7}>
          <CartList productsInOrder={ orderItems as unknown }/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen ({ numberOfItems } { numberOfItems > 1 ? 'productos' : 'producto' })</Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <Typography>{ `${name} ${lastname}` }</Typography>
              <Typography>{ `${address} ${address2 ? `- ${address2}` : ''}` }</Typography>
              <Typography>{ city } - { country }</Typography>
              <Typography>{ zip }</Typography>
              <Typography>{ phone }</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary cartSummary={cartSummary}/>

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column' >

              {
                isPaid 
                ? (
                    <Chip
                      sx={{ my: 1 }}
                      label="Pago realizado"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) 
                : (
                  <>
                    <Chip
                      sx={{ my: 1 }}
                      label="Pendiente de pago"
                      variant="outlined"
                      color="error"
                      icon={<CreditCardOffOutlined />}
                    />
                  </>
                  )
                    
                }
                
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrderPage;





export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  
  const { id = '' } = query;
  const session: any = await getSession({ req })

  const order = await dbOrders.getOrderById( id.toString() );

  if (!order) {
    return {
      redirect: {  
        destination: '/admin/orders',
        permanent: false,
      }
    }
  }

  return {
    props: {
      order
    }
  }
}