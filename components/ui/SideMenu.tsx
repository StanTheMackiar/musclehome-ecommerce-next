import { useContext, useState } from 'react';
import { useRouter } from "next/router";

import { LangContext } from '../../context/lang/LangContext';
import { AuthContext, UIContext } from "../../context";


import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, 
LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

import { ChangeLanguage } from './';


export const SideMenu = () => {

    const { isLoggedIn, user } = useContext(AuthContext)
    const { lang } = useContext(LangContext);
    const { ui: {shop_layout: {side_menu}} } = lang;
    
    const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
    const [searchTerm, setSearchTerm] = useState('');

   

    const {push} = useRouter()

    const onSearchTerm = () => {
        if ( searchTerm.trim().length === 0 ) return;
        navigateTo(`/search/${searchTerm}`)

    }

    const navigateTo = ( url:string ) => {
        push(url)
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

                <ListItem>
                    <Typography variant='subtitle1'>{ isLoggedIn ? `Hola, ${ user?.name }` : 'Invitado'}</Typography>

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
                
                <ListItem onClick={()=> navigateTo('/category/men')} button sx={{ display: { xs: '', md: 'none' } }}>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.categories.men} />
                </ListItem>

                <ListItem onClick={()=> navigateTo('/category/women')} button sx={{ display: { xs: '', md: 'none' } }}>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.categories.women} />
                </ListItem>

                <ListItem onClick={()=> navigateTo('/category/kid')} button sx={{ display: { xs: '', md: 'none' } }}>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.categories.kids} />
                </ListItem>

                <Divider sx={{ display: { xs: '', md: 'none' } }}/>
                

                {/* Account */}

                <ListSubheader>{side_menu.account.subheader}</ListSubheader>

                <ListItem button onClick={() => navigateTo('/auth/login')}>
                    <ListItemIcon>
                        <VpnKeyOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.account.login} />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.account.profile} />
                </ListItem>

                <ListItem button onClick={() => navigateTo('/orders/history')}>
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.account.orders} />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <LoginOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.account.logout} />
                </ListItem>


                {/* Admin */}
                <Divider />

                <ListSubheader>{side_menu.admin.subheader}</ListSubheader>

                <ListItem button>
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.admin.products} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.admin.orders} />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <AdminPanelSettings/>
                    </ListItemIcon>
                    <ListItemText primary={side_menu.admin.users} />
                </ListItem>

                <Divider />

                <ListSubheader>Idioma</ListSubheader>
                
                <ListItem button>
                    <ChangeLanguage />
                </ListItem>
            </List>
        </Box>
    </Drawer>
  )
}