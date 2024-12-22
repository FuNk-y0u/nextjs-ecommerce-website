

import '@/styles/globals.css';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import NavBar from '@/components/NavBar';
import { usePathname } from 'next/navigation';

const theme = createTheme({ 
  /** Put your mantine theme override here */
});
function Application({ Component, pageProps }) {
  var pathname = usePathname();
  if (pathname == null){
    pathname = "";
  }

  return <>
    <MantineProvider theme={theme}>
      {
        pathname.includes("/admin")?"":<NavBar/>
      }
      
      <Component {...pageProps} />
    </MantineProvider>
  </>
}

export default Application
