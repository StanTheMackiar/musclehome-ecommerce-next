import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export const ShoppingCartEmpty = () => {


  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
    >
      <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
      
      <Box display="flex" flexDirection="column" alignItems="center">

        <Typography textAlign="center" variant="h6" marginTop={2}>
          Aún no añadiste articulos a tu carrito de compras
        </Typography>
        <Link href="/" style={{textDecoration: 'none'}}>
          <Button sx={{ mt: 2 }} size="large" color="secondary" className="circular-btn">
            Ir a comprar
          </Button>
        </Link>

      </Box>
    </Box>
  );
};
