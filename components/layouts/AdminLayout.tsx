import { Box, Typography } from "@mui/material";
import { FC, PropsWithChildren} from "react"

import { NavBar, SideMenu } from "../ui";
import Head from "next/head";

interface Props {
    title: string,
    subTitle: string,
    icon?: JSX.Element,

    pageTitle: string,
    pageDescription: string
}

export const AdminLayout: FC<PropsWithChildren<Props>> = ({children, subTitle, icon, title, pageDescription, pageTitle}) => {


  return (
    <>
        <Head>
          <title>{ pageTitle }</title>
          <meta name="description" content={ pageDescription }/>
        </Head>
        
        <SideMenu />
        
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            <Box display='flex' flexDirection='column'>
                <Typography variant="h1" component='h1'>
                    { icon }
                    { ' ' }
                    { title }
                </Typography>
                <Typography variant="h2" sx={{mb: 1}}>
                    { subTitle }
                </Typography>
            </Box>

            <Box mt={2} className="fade-In">
                {children}
            </Box>
        </main>
    </>
  )
}
