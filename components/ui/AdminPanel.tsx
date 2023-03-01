import { FC, useContext } from "react";
import { LangContext } from "../../context/lang/LangContext";
import { DashboardOutlined } from '@mui/icons-material';
import {
  ListSubheader,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
} from "@mui/icons-material";


interface Props {
  navigateTo: (url: string) => void;
}

export const AdminPanel: FC<Props> = ({ navigateTo }) => {

    const { lang: {ui: {shop_layout: {side_menu}}} } = useContext(LangContext);

  return (
    <>
      <Divider />

      <ListSubheader>{side_menu.admin.subheader}</ListSubheader>

      <ListItemButton
        onClick={() => navigateTo('/admin')}
      >
        <ListItemIcon>
          <DashboardOutlined />
        </ListItemIcon>
        <ListItemText primary={side_menu.admin.dashboard} />
      </ListItemButton>

      <ListItemButton
        onClick={() => navigateTo('/admin/products')}
      >
        <ListItemIcon>
          <CategoryOutlined />
        </ListItemIcon>
        <ListItemText primary={side_menu.admin.products} />
      </ListItemButton>

      <ListItemButton onClick={() => navigateTo('/admin/orders')}>
        <ListItemIcon>
          <ConfirmationNumberOutlined />
        </ListItemIcon>
        <ListItemText primary={side_menu.admin.orders} />
      </ListItemButton>
      
      <ListItemButton onClick={() => navigateTo('/admin/users')}>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary={side_menu.admin.users} />
      </ListItemButton>
    </>
  );
};
