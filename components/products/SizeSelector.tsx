import { FC } from 'react'
import { IValidSize } from '../../interfaces';
import { Box, Button } from '@mui/material';


interface Props {
    selectedSize?: IValidSize,
    sizes: IValidSize[];
}


export const SizeSelector:FC<Props> = ({ selectedSize, sizes }) => {

   return (
      <Box>
         {
            sizes.map( size => (
                <Button
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