import { FC, useContext } from "react";

import { DeleteOutlined } from "@mui/icons-material";
import { Typography, Grid, Link, CardActionArea, CardMedia,  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { CartContext } from "../../context";
import { ItemCounter } from "./";
import { ICartProduct } from "../../interfaces";

interface Props {
  editable?: boolean;
  productsInOrder?: unknown;
}

export const CartList: FC<Props> = ({ editable = false, productsInOrder }) => {
  
  const { cart: productsInCart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const onNewCartQuantityValue = ( product: ICartProduct, newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const productsToShow = productsInOrder ? productsInOrder as ICartProduct[] : productsInCart;


  return (
    <>
      {productsToShow.map((product) => (
        <Grid
          container
          spacing={2}
          key={product.slug + product.size}
          sx={{ mb: { xs: 3, sm: 1 } }}
        >
          <Grid item xs={3}>
            <Link href={`/product/${product.slug}`}>
              <CardActionArea>
                <CardMedia
                  image={product.image}
                  component="img"
                  alt={product.title}
                  sx={{ borderRadius: "5px" }}
                />
              </CardActionArea>
            </Link>
          </Grid>

          <Grid item xs={7}>
            <Box display={"flex"} flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              {
                product.size &&
                <Typography variant="body1">
                  Talla: <strong>{product.size}</strong>
                </Typography>
              }

              <Box display="flex" flexDirection="row">

                {editable && !productsInOrder ? (
                  <ItemCounter
                    currentValue={ product.quantity }
                    maxValue={ product.inStock }
                    updatedQuantity={(newValue) =>
                      onNewCartQuantityValue(product as ICartProduct, newValue)
                    }
                  />
                ) : (
                  <Typography
                    display="flex"
                    alignItems="center"
                    variant="button"
                  >
                    {product.quantity} {product.quantity <= 1 ? "producto" : "productos"}
                  </Typography>
                )}

                {editable && (
                  <IconButton sx={{ ml: 2 }} onClick={()=> removeCartProduct( product as ICartProduct )}>
                    <DeleteOutlined />
                  </IconButton>
                )}

              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
