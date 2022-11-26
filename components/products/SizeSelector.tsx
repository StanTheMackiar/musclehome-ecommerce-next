import { FC } from 'react'
import { IValidSize } from '../../interfaces';
import { Box, Button } from '@mui/material';


interface Props {
    selectedSize?: IValidSize,
    sizes: IValidSize[],

    onSelectedSize: ( size: IValidSize ) => void,
}


export const SizeSelector:FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {


   return (
      <Box>
         {
            sizes.map( size => (
                <Button
                    onClick={() => onSelectedSize( size )}
                    key={ size }
                    size='small'
                    color={ selectedSize === size ? 'primary' : 'info'}
                >
                    { size }
                </Button>
            ))
         }
      </Box>
   )
}