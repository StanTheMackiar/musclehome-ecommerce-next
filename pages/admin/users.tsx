import { useEffect, useState } from 'react';
import { PeopleOutline } from '@mui/icons-material';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Grid, MenuItem, Select } from '@mui/material';
import useSWR from 'swr';
import { IUser } from '../../interfaces/user';
import { useSnackbar } from 'notistack';
import { shopApi } from '../../api';


const UsersPage = () => {

  const { data, error }  = useSWR<IUser[]>('/api/admin/users')
  const [ users, setUsers ] = useState<IUser[]>([]);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    if(!data) return;
    setUsers(data);
  }, [data]);

  if( !data && !error ) return <></>;

  const onRoleUpdated = async( userId: string, newRole: string ) => {
    
    const previousUsers = users.slice();
    const updatedUsers = users.map( user => ({
      ...user,
      role: userId === user._id ? newRole : user.role
    }) )
    setUsers(updatedUsers);

    try {
      await shopApi.put('/admin/users', { userId, role: newRole });
      enqueueSnackbar('Rol actualizado', {variant: 'success'});
    } catch (error) {
      setUsers(previousUsers);
      console.log({error});
      enqueueSnackbar('No se pudo actualizar el rol del usuario', {variant: 'error'});
    }

  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre completo', width: 300},
    { field: 'email', headerName: 'Correo', width: 250 },
    { 
      field: 'role', 
      headerName: 'Rol', 
      width: 300,
      renderCell: ({row}: GridRenderCellParams) => {
        return ( 
          <Select
            value={ row.role }
            label="Rol"
            onChange={ ({ target }) => onRoleUpdated( row.id, target.value )}
            sx={{ width: '300px' }}
          >
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='client'>Cliente</MenuItem>
          </Select>
         )
      }
    }
  ]

  const rows = users.map( user => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }) )

  return (
    <AdminLayout
      pageTitle='Usuarios | Panel Admin | Muscle Home'
      pageDescription='Panel de administración de usuarios de Muscle Home'
      title='Usuarios'
      subTitle='Mantenimiento de usuarios'
      icon={<PeopleOutline />}
    >
       <Grid container marginTop={2} className='fadeIn'>
        <Grid item xs={12} sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[10, 20, 30]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}
export default UsersPage