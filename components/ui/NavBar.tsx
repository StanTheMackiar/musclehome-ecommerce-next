import { useContext, useState } from "react";
import Image from "next/image";
import NextLink from "next/link"
import { useRouter } from 'next/router';

import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography, Input, InputAdornment } from '@mui/material';
import { LangContext } from "../../context/lang";

import { SearchOutlined, ShoppingCartOutlined, MenuOutlined, ClearOutlined  } from "@mui/icons-material";
import { UIContext } from "../../context";
import { CartContext } from '../../context/cart/CartContex';

export const NavBar = () => {

  const { toggleSideMenu } = useContext(UIContext);
  const { lang: {ui: {shop_layout: {side_menu}}} } = useContext(LangContext);
  const { summary: {numberOfItems} } = useContext(CartContext);
  const { asPath, push } = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);


  const onSearchTerm = () => {
    if ( searchTerm.trim().length === 0 ) return;
    push(`/search/${searchTerm}`)

}


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


        {/* Categorias */}

        <Box 
          sx={{ display: isSearchVisible ? 'none' : { xs: 'none', md: 'flex' }}} 
          className='fadeIn' 
        >
          <NextLink href="/category/men" style={{ textDecoration: "none" }}>
            <Button color={asPath === "/category/men" ? "primary" : "info"}>
              {side_menu.categories.men}
            </Button>
          </NextLink>

          <NextLink href="/category/women" style={{ textDecoration: "none" }}>
            <Button color={asPath === "/category/women" ? "primary" : "info"}>
            {side_menu.categories.women}
            </Button>
          </NextLink>

          <NextLink href="/category/kid" style={{ textDecoration: "none" }}>
            <Button color={asPath === "/category/kid" ? "primary" : "info"}>
            {side_menu.categories.kids}
            </Button>
          </NextLink>
        </Box>

        <Box flex={1} />


        {/* Busqueda */}

        {/* Pantallas grandes */}
        {isSearchVisible ? (
          <Input
            sx={{ 
              display: { xs: "none", md: "flex" }, 
              mx: 2,
              width: '50%',
            }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                  <ClearOutlined sx={{cursor: 'pointer'}} onClick={() => setIsSearchVisible(false)}/>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { sm: "none", md: "flex" } }}
          >
            <SearchOutlined />
          </IconButton>
        )}


        {/* Pantallas pequeñas */}
        <IconButton
          sx={{ display: { sm: "flex", md: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        {/* Carrito */}

        <NextLink href="/cart">
          <IconButton sx={{ mr: "1rem" }}>
            <Badge badgeContent={ numberOfItems > 9 ? '+9' : numberOfItems } color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </NextLink>
          

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
