import { useContext } from "react";
import Image from "next/image";
import NextLink from "next/link"
import { useRouter } from "next/router";

import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import { Lang, LangContext } from "../../context/lang";

import { SearchOutlined, ShoppingCartOutlined, MenuOutlined  } from "@mui/icons-material";

export const NavBar = () => {

  const { lang } = useContext(LangContext);
  const { push, pathname } = useRouter();

  const onClick = (locale: Lang) => {
      push(pathname, pathname, {locale})
  }
  
  return (
    <AppBar >
        <Toolbar>
              <NextLink href='/' style={{color: 'black', textDecoration: 'none'}}>
                <Image src='/img/logoblack.png' alt='Logo' width={50} height={50} style={{objectFit: 'contain'}}/>
              </NextLink>
              <NextLink href='/' style={{color: 'black', textDecoration: 'none'}}>
                <Typography variant="h6" sx={{ml: '0.5rem'}}>MuscleHome</Typography>
              </NextLink>
          
            <Box flex={1} />

            <Box sx={{ display: { xs: 'none', md: 'block'} }}>
              <NextLink href='/category/men' style={{textDecoration: 'none'}}>
                  <Button>Hombres</Button>
              </NextLink>
              <NextLink href='/category/women' style={{textDecoration: 'none'}}>
                  <Button>Mujeres</Button>
              </NextLink>
              <NextLink href='/category/kid' style={{textDecoration: 'none'}}>
                  <Button>Niños</Button>
              </NextLink>
            </Box>
            

            <Box flex={1} />

            <IconButton sx={{display: {xs: 'none', md: ''}}}>
              <SearchOutlined />
            </IconButton>

            <NextLink href='/cart'>
              <IconButton sx={{mr: '1rem'}}>
                <Badge badgeContent={2} color='secondary'>
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </NextLink>


            <Box sx={{display: {xs: 'none', md: 'block'}}}>

              <IconButton onClick={() => onClick("es")}>
                <Image src='/img/espana.png' alt='Spain Flag' width={27} height={27}/>
              </IconButton>
              <IconButton onClick={() => onClick("en")}>
                <Image src='/img/usa.png' alt='USA Flag' width={27} height={27}/>
              </IconButton>
            </Box>
            
            <Box>
              <IconButton>
                <MenuOutlined />
              </IconButton>
            </Box>

            

        </Toolbar>
    </AppBar>
  )
}
