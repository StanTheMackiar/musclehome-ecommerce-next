import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes';
import { LangProvider } from '../context/lang';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <LangProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </LangProvider>
  )
}
