import { useContext } from "react";
import Image from "next/image";
import NextLink from "next/link"

import { AppBar, Box, IconButton, Toolbar, Typography, } from '@mui/material';

import { MenuOutlined } from "@mui/icons-material";
import { UIContext } from "../../context";

export const AdminNavBar = () => {

  const { toggleSideMenu } = useContext(UIContext);


  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" style={{ color: "black", textDecoration: "none" }}>
          <Image
            src="/img/logoblack.png"
            alt="Logo"
            width={50}
            height={50}
            style={{ objectFit: "contain" }}
          />
        </NextLink>
        <NextLink href="/" style={{ color: "black", textDecoration: "none" }}>
          <Typography variant="h6" sx={{ ml: "0.5rem" }}>
            MuscleHome
          </Typography>
        </NextLink>

        <Box flex={1} />

          {/* Menu */}
          
        <Box>
          <IconButton onClick={() => toggleSideMenu()}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
