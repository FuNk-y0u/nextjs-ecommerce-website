

import '@/styles/globals.css';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import NavBar from '@/components/NavBar';
import { usePathname } from 'next/navigation';
import axios from 'axios';

import { getEndpoint, endPoints } from "../lib/pages";
import { getCookie, setCookie } from 'cookies-next';
import BottomBar from '../components/BottomBar';
const theme = createTheme({ 
  /** Put your mantine theme override here */
});

function checkCartId(){

  // Checking if cart-id cookie exists
  if(!getCookie("cart-id")){
    // Getting new cart-id
    var result = axios.post(getEndpoint(endPoints.getcartId), {});

    // Setting cart-id cookie
    result.then( 
      (value)=>{
        setCookie("cart-id", value.data.id);
      }
    ) 
  }
}

function Application({ Component, pageProps }) {
  var pathname = usePathname();
  if (pathname == null){
    pathname = "";
  }
  
  checkCartId();

  return <>
    <MantineProvider theme={theme}>
      {
        pathname.includes("/admin")?"":<NavBar/>
      }
      
      <Component {...pageProps} />

      {
        pathname.includes("/admin")?"":<BottomBar/>
      }
    </MantineProvider>
  </>
}

export default Application
