import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'


interface Props {
    currentValue: number,
    maxValue: number,
    updatedQuantity: (quantity: number) => void

}


export const ItemCounter:FC<Props> = ({ currentValue, maxValue, updatedQuantity }) => {

   const increaseBy = (value: number) => {

      let newValue: number;

      if ( value <= -1 ) newValue = Math.max(currentValue + value, 1)
      
      if ( value >= 1 ) newValue = Math.min(currentValue + value, maxValue)

      return updatedQuantity(newValue!)
    };



   return (
      <Box display='flex' alignItems='center'>
         <IconButton onClick={()=> increaseBy(-1)}>
            <RemoveCircleOutline />
         </IconButton>
         <Typography sx={{ width: 40, textAlign: 'center'}}>{currentValue}</Typography>
         <IconButton onClick={()=> increaseBy(1)}>
            <AddCircleOutline />
         </IconButton>
      </Box>
   )
}