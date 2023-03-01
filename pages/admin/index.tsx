import { DashboardOutlined, CreditCardOffOutlined, CreditCardOutlined, AttachMoneyOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { AdminLayout } from '../../components/layouts'
import { Grid, Typography} from '@mui/material'
import { DashboardCard } from '../../components/admin';
import useSWR from 'swr';
import { DashboardSummaryResponse } from '../../interfaces';
import { useEffect, useState } from 'react';

const DashboardPage = () => {

  const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000 // 30segundos
  })
  const [ refreshIn, setRefreshIn ] = useState(30);
  
  useEffect(() => {
    if(!data) return;
    const interval = setInterval(() => {
      console.log('Tick');
      setRefreshIn( prev => prev > 0 ? prev - 1 : 30)
    }, 1000)

    //Funcion que se ejecuta al desmontar el componente
    return () => clearInterval(interval)
  }, [data]);

  
  if ( error ){
    console.log(error)
    return <Typography>Error al cargar la información</Typography>
  }
  if (!data) {
    return <Typography>Loading...</Typography>
  }

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data


  return (
    <AdminLayout
        pageTitle='Dashboard | Panel Admin | Muscle Home'
        pageDescription='Panel de administrador de Muscle Home'
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={<DashboardOutlined />}
    >
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={3}>
            <DashboardCard 
              icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
              title={numberOfOrders}
              subTitle='Ordenes totales' 
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <DashboardCard 
              icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
              title={paidOrders}
              subTitle='Ordenes Pagadas' 
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <DashboardCard 
              icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
              title={notPaidOrders}
              subTitle='Ordenes pendientes' 
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <DashboardCard 
              icon={<GroupOutlined color='success' sx={{ fontSize: 40 }} />}
              title={numberOfClients}
              subTitle='Clientes' 
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <DashboardCard 
              icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
              title={numberOfProducts}
              subTitle='Productos' 
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <DashboardCard 
              icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
              title={productsWithNoInventory}
              subTitle='Sin existencias' 
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <DashboardCard 
              icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
              title={lowInventory}
              subTitle='Bajo inventario' 
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <DashboardCard 
              icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
              title={refreshIn}
              subTitle='Actualización en:' 
            />
          </Grid>
        </Grid>
    </AdminLayout>
  )
}

export default DashboardPage