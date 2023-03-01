import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes';
import { LangProvider } from '../context/lang';
import { SWRConfig } from 'swr';
import { AuthProvider, CartProvider, UIProvider } from '../context';
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SnackbarProvider } from 'notistack'

export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {

  return (
    <SessionProvider session={session}>
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
      >
        <SnackbarProvider maxSnack={3}>
          <PayPalScriptProvider options={{"client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
            <AuthProvider>
              <LangProvider>
                <CartProvider>
                  <UIProvider>
                    <ThemeProvider theme={lightTheme}>
                      <CssBaseline />
                      <Component {...pageProps} />
                    </ThemeProvider>
                  </UIProvider>
                </CartProvider>
              </LangProvider>
            </AuthProvider>
          </PayPalScriptProvider>
        </SnackbarProvider>
      </SWRConfig>
    </SessionProvider>
    
  )
}
