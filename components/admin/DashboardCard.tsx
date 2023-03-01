import { Card, CardContent, Typography } from '@mui/material'
import { FC } from 'react'


interface Props {
    title: string | number,
    subTitle: string,
    icon: JSX.Element
}


export const DashboardCard:FC<Props> = ({ title, icon, subTitle }) => {

   return (
      <Card sx={{ display: 'flex'}}>
        <CardContent sx={{width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 4}}>
          { icon }
        </CardContent>
        <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h3'>{ title }</Typography>
          <Typography variant='caption'>{ subTitle }</Typography>
        </CardContent>
      </Card>
   )
}