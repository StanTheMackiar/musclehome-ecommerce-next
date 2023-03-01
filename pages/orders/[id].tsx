import { NextPage, GetServerSideProps } from "next";

import { Typography, Grid, Card, CardContent, Divider, Box, Chip, CircularProgress } from "@mui/material";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { CreditScoreOutlined, CreditCardOffOutlined  } from "@mui/icons-material";
import { CartList, OrderSummary } from "../../components/cart";

import { ShopLayout } from "../../components/layouts";
import { dbOrders } from "../../database";
import { getSession } from 'next-auth/react';
import { IOrder } from "../../interfaces";
import { shopApi } from "../../api";
import { useRouter } from 'next/router';
import { useState } from "react";

interface Props {
  order: IOrder,
}

interface OrdenResponseBody {
  id: string,
  status:
  | "COMPLETED"
  | "SAVED"
  | "APPROVED"
  | "VOIDED"
  | "PAYER_ACTION_REQUIRED";
}

const OrderPage: NextPage<Props> = ({ order }) => {

  const { cartSummary, isPaid, orderItems, shippingAddress, _id } = order;
  const { numberOfItems } = cartSummary
  const { address, city, country, lastname, name, phone, zip, address2 } = shippingAddress;

  const [ isPaying, setIsPaying ] = useState(false);

  const router = useRouter();

  const onOrderCompleted = async (details: OrdenResponseBody ) => {
    
    if ( details.status !== 'COMPLETED' )  {
      return alert('No hay pago en PayPal')
    }

    setIsPaying(true);

    try {
      await shopApi.post(`/orders/pay`, {
        transaction_id: details.id,
        order_id: order._id
      });

      router.reload();

    } catch (error) {
        setIsPaying(false);
        console.log({error})
        alert('Error')
    }

  }

  return (
    <ShopLayout
      title={`Orden N°: ${ _id }`}
      description={`Resumen de la orden N°: ${ _id }`}
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
                  isPaying
                  ? (
                      <Box 
                        display='flex' 
                        justifyContent='center' 
                        className="fadeIn"
                      >
                        <CircularProgress />
                      </Box>
                    )
                  : (
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
                        <PayPalButtons 
                          createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                      amount: {
                                          value: String(order.cartSummary.total),
                                      },
                                    },
                                ],
                            });
                          }}
                          onApprove={(data, actions) => {
                              return actions.order!.capture().then((details) => {
                                  onOrderCompleted(details)
                              });
                          }}
                        />
                      </>
                      )
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