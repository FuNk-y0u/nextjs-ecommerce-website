import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";
import axios from "axios";

import { getEndpoint, endPoints } from "../lib/pages";
import { getCookie, setCookie } from "cookies-next";
import BottomBar from "../components/BottomBar";
import { useRouter } from "next/router";
const theme = createTheme({
  /** Put your mantine theme override here */
});

function checkCartId() {
  // Checking if cart-id cookie exists
  if (!getCookie("cart-id")) {
    // Getting new cart-id
    var result = axios.post(getEndpoint(endPoints.getcartId), {});

    // Setting cart-id cookie
    result.then((value) => {
      setCookie("cart-id", value.data.id);
    });
  }
}

function Application({ Component, pageProps }) {
  // Setting router to global
  const router = useRouter();
  globalThis.router = router;

  var pathname = usePathname();
  if (pathname == null) {
    pathname = "";
  }

  checkCartId();

  return (
    <>
      <MantineProvider theme={theme}>
        {/*
        ! HACKY AHHH SHIT INCOMMING!
        TODO WRAP THIS IN TO A FUNCTION
       */}
        {pathname.includes("/admin") ? (
          ""
        ) : pathname.includes("/checkout") ? (
          <NavBar disableCart={true}></NavBar>
        ) : (
          <NavBar disableCart={false}></NavBar>
        )}

        <Component {...pageProps} />

        {pathname.includes("/admin") ? "" : <BottomBar />}
      </MantineProvider>
    </>
  );
}

export default Application;
