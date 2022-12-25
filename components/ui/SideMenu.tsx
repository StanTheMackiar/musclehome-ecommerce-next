import { useContext, useState } from 'react';
import { useRouter } from "next/router";

import { LangContext } from '../../context/lang/LangContext';
import { AuthContext, UIContext } from "../../context";


import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';
import { AccountCircleOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, 
LoginOutlined, MaleOutlined, SearchOutlined, Login, VpnKeyOutlined } from "@mui/icons-material"

import { ChangeLanguage } from './';
import { AdminPanel } from './AdminPanel';


export const SideMenu = () => {

    const { isLoggedIn, logOut, user } = useContext(AuthContext)
    const { lang } = useContext(LangContext);
    const { side_menu } = lang?.ui.shop_layout || {};
    
    const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
    const [searchTerm, setSearchTerm] = useState('');

   

    const router = useRouter()

    const onSearchTerm = () => {
        if ( searchTerm.trim().length === 0 ) return;
        navigateTo(`/search/${searchTerm}`)

    }

    const navigateTo = ( url:string ) => {
        router.push(url)
        toggleSideMenu();
    }

  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: {xs: 250, sm: 300, md: 350}, p: '2rem 1rem', }}>
            
            <List>

                <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                    <Typography variant='subtitle1'>{ isLoggedIn ? `${ user?.name } ${ user?.lastname }` : 'Invitado'}</Typography>
                    {
                        (user?.role === 'admin') &&
                        <Typography variant='body2'>Administrador</Typography>
                    }

                </ListItem>

                <ListItem sx={{display: {xs: 'flex', md: 'none'}}}>
                    <Input
                        autoFocus
                        value={ searchTerm }
                        onKeyUp={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                        type='text'
                        onChange={ (e) => setSearchTerm( e.target.value )}
                        fullWidth
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => onSearchTerm }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>
                

                {/* Categories */}
                
                <ListItemButton onClick={()=> navigateTo('/category/men')}  sx={{ display: { xs: '', md: 'none' } }}>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.categories.men} />
                </ListItemButton>

                <ListItemButton onClick={()=> navigateTo('/category/women')}  sx={{ display: { xs: '', md: 'none' } }}>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.categories.women} />
                </ListItemButton>

                <ListItem onClick={()=> navigateTo('/category/kid')}  sx={{ display: { xs: '', md: 'none' } }}>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.categories.kids} />
                </ListItem>

                <Divider sx={{ display: { xs: '', md: 'none' } }}/>
                

                {/* Account */}

                <ListSubheader>{side_menu.account.subheader}</ListSubheader>

               { 
                !isLoggedIn &&
                    <>  

                        {/* Login */}
                        <ListItemButton  onClick={() => navigateTo(`/auth/login?page=${ router.asPath }`)}>
                            <ListItemIcon>
                                <Login/>
                            </ListItemIcon>
                            <ListItemText primary={side_menu.account.login} />
                        </ListItemButton> 


                        {/* Register */}
                        <ListItemButton  onClick={() => navigateTo(`/auth/register?page=${ router.asPath }`)}>
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={side_menu.account.register} />
                        </ListItemButton>

                    </>
                }


                {
                isLoggedIn &&
                <>
                    {/* Perfil */}
                    <ListItemButton >
                        <ListItemIcon>
                            <AccountCircleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={side_menu.account.profile} />
                    </ListItemButton>

                    {/* Ordenes */}
                    <ListItemButton onClick={() => navigateTo('/orders/history')}>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={side_menu.account.orders} />
                    </ListItemButton>

                    {/* Salir */}
                        <ListItemButton onClick={ logOut }>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={side_menu.account.logout} />
                        </ListItemButton>
                </>
                }

                
                {/* Admin */}
                { user?.role === 'admin' && <AdminPanel /> }


                <Divider />

                <ListSubheader>Idioma</ListSubheader>
                
                <ListItem >
                    <ChangeLanguage />
                </ListItem>
            </List>
        </Box>
    </Drawer>
  )
}