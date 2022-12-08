import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes';
import { LangProvider } from '../context/lang';
import { SWRConfig } from 'swr';
import { AuthProvider, CartProvider, UIProvider } from '../context';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {

  return (
    <SessionProvider session={session}>
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
      >
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
      </SWRConfig>
    </SessionProvider>
  )
}
