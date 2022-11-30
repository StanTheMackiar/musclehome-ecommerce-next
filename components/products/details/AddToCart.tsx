import { FC } from "react";

import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";

import { ItemCounter } from "../../cart";
import { SizeSelector } from "../SizeSelector";
import { IProduct } from "../../../interfaces";
import { useAddToCart } from '../../../hooks/useAddToCart';


export interface Props {
  product: IProduct;
}

export const AddToCart: FC<Props> = ({ product }) => {

  const { tempCartProduct, onAddProduct, onSelectedSize, onUpdatedQuantity } = useAddToCart({ product })
   

  return (
    <>
      {/* Cantidad */}

      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle1" paddingLeft={1}>
          Cantidad
        </Typography>
        <ItemCounter
          currentValue={
            tempCartProduct.inStock > 0 ? tempCartProduct.quantity : 0
          }
          updatedQuantity={onUpdatedQuantity}
          maxValue={product.inStock > 10 ? 10 : product.inStock}
        />
        <Typography
          display="flex"
          justifyContent="end"
          variant="subtitle2"
          paddingLeft={1}
          marginBottom={3}
        >
          Disponibles: {tempCartProduct.inStock}
        </Typography>
        <SizeSelector
          selectedSize={tempCartProduct.size}
          sizes={product.sizes}
          onSelectedSize={onSelectedSize}
        />
      </Box>

      {/* Boton Agregar al carrito */}

      {product.inStock > 0 ? (
        <Button
          color="secondary"
          className="circular-btn"
          fullWidth
          onClick={onAddProduct}
          disabled={!tempCartProduct.size}
          endIcon={<AddShoppingCartOutlined />}
        >
          {tempCartProduct.size ? "Agregar al carrito" : "Seleccione una talla"}
        </Button>
      ) : (
        <Button
          color="secondary"
          className="circular-btn"
          disabled
          variant="outlined"
          fullWidth
        >
          No disponible
        </Button>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" fontWeight={700}>
          Descripción
        </Typography>
        <Typography variant="body2">{product.description}</Typography>
      </Box>

    </>
  );
};
