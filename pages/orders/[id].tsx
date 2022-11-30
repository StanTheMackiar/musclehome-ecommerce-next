import { CreditScoreOutlined} from "@mui/icons-material";
import { Typography, Grid, Card, CardContent, Divider, Box, Chip } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";

const OrderPage: NextPage = () => {
  return (
    <ShopLayout
      title="Resumen de la orden 1242424"
      description="Resumen de la orden"
    >
      <Typography variant="h1" component="h1" marginBottom={2}>
        Orden: ABC1234
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productsos)</Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <Typography>Stanly Calle</Typography>
              <Typography>Cra 8B #47-93</Typography>
              <Typography>Barranquilla - Colombia</Typography>
              <Typography>+57 3163776973</Typography>

              <Box display="flex" justifyContent="end">
                <Link href="/checkout/address" style={{ color: "black" }}>
                  Editar informacion
                </Link>
              </Box>

              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 1 }}
                  label="Pago realizado"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
