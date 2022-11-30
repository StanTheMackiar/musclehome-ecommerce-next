import { FC, useContext } from 'react';
import { LangContext } from '../../context/lang/LangContext';
import { ListSubheader, Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined } from "@mui/icons-material"

export const AdminPanel:FC = () => {

    const { lang: {ui: {shop_layout: {side_menu}}} } = useContext(LangContext);

   return (
      <>
         <Divider />
                    
                    <ListSubheader>{side_menu.admin.subheader}</ListSubheader>
                
                    <ListItem button>
                    <ListItemIcon>
                        <CategoryOutlined />
                    </ListItemIcon>
                    <ListItemText primary={side_menu.admin.products} />
                </ListItem><ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={side_menu.admin.orders} />
                    </ListItem><ListItem button>
                        <ListItemIcon>
                            <AdminPanelSettings />
                        </ListItemIcon>
                        <ListItemText primary={side_menu.admin.users} />
                    </ListItem>
      </>
   )
}