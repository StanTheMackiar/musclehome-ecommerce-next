import { FC, useContext } from "react";
import { LangContext } from "../../context/lang/LangContext";
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

export const AdminPanel: FC = () => {

    const { lang: {ui: {shop_layout: {side_menu}}} } = useContext(LangContext);

  return (
    <>
      <Divider />

      <ListSubheader>{side_menu.admin.subheader}</ListSubheader>

      <ListItemButton>
        <ListItemIcon>
          <CategoryOutlined />
        </ListItemIcon>
        <ListItemText primary={side_menu.admin.products} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <ConfirmationNumberOutlined />
        </ListItemIcon>
        <ListItemText primary={side_menu.admin.orders} />
      </ListItemButton>
      
      <ListItemButton>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary={side_menu.admin.users} />
      </ListItemButton>
    </>
  );
};
