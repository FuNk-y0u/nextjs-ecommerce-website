

import '@styles/globals.css'
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});
function Application({ Component, pageProps }) {
  
  return <>
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  </>
}

export default Application
