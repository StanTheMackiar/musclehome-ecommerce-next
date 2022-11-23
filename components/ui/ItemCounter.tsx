import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'


interface Props {
    prop?: string
}


export const ItemCounter:FC<Props> = ({ prop }) => {

   return (
      <Box display='flex' alignItems='center'>
         <IconButton>
            <RemoveCircleOutline />
         </IconButton>
         <Typography sx={{ width: 40, textAlign: 'center'}}>1</Typography>
         <IconButton>
            <AddCircleOutline />
         </IconButton>
      </Box>
   )
}