import SessionProvider, { sessionContext } from '../context/Session'
import TableProvider from '../context/Table'
import ThemeProvider, { themeContext } from '../context/Theme'
import '../src/styles/global.css'

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <>
            <ThemeProvider>
                <TableProvider>
                    <SessionProvider><Component {...pageProps} /></SessionProvider>
                </TableProvider>
            </ThemeProvider>
            
        </>
    )
}