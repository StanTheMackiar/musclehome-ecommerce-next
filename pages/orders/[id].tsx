import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";

import { Typography, Grid, Card, CardContent, Divider, Box, Chip, Button } from "@mui/material";
import { CreditScoreOutlined, CreditCardOffOutlined  } from "@mui/icons-material";
import { CartList, OrderSummary } from "../../components/cart";

import { ShopLayout } from "../../components/layouts";
import { dbOrders } from "../../database";
import { getSession } from 'next-auth/react';
import { IOrder } from "../../interfaces";

interface Props {
  order: IOrder,
}

const OrderPage: NextPage<Props> = ({ order }) => {

  const { cartSummary, isPaid, orderItems, shippingAddress, _id } = order;
  const { numberOfItems } = cartSummary
  const { address, city, country, lastname, name, phone, zip, address2 } = shippingAddress;

  return (
    <ShopLayout
      title={`Orden N°: ${ _id }`}
      description={`Resumen de la orden N°: ${ _id }`}
    >
      <Typography variant="h1" component="h1" marginBottom={2}>
        Orden N°: { _id }
      </Typography>

      <Grid container spacing={2}>
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

              <OrderSummary />

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
                      <Button 
                        variant="contained" 
                        color="secondary" 
                        className="circular-btn"
                      >
                        Pagar
                      </Button>
                    </>
                    )
                }      
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
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
        destination: '/orders/history',
        permanent: false,
      }
    }
  }

  if ( order.user !== session.user.id ) {
    return {
      redirect: {  
        destination: '/orders/history',
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