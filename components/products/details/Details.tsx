import { FC } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { IProduct } from "../../../interfaces";
import { ProductDetailsAddToCart } from ".";
import { ProductSlideShow } from "../ProductSlideShow";

interface Props {
  product: IProduct;
}

export const Details: FC<Props> = ({ product }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={7}>
        <ProductSlideShow images={product.images} />
      </Grid>

      <Grid item xs={12} sm={5}>
        <Box display="flex" flexDirection="column">
          {" "}
          <Typography variant="h1" component="h1">
            {product.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="h2"
          >{`$${product.price}`}</Typography>
          <ProductDetailsAddToCart product={product} />
        </Box>
      </Grid>
    </Grid>
  );
};
