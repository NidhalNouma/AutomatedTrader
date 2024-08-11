import "../styles/globals.css";
import "../styles/landing.css";

import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useState, useEffect, Fragment } from "react";

import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { UserProvider, useUser } from "../contexts/UserContext";
import { NotificationProvider } from "../contexts/NotificationContext";
import { WebhookProvider } from "../contexts/WebhookContext";
import { AlertProvider } from "../contexts/AlertContext";
import { MetatraderProvider } from "../contexts/MetatraderContext";
import { BinanceProvider } from "../contexts/BinanceContext";
import { TelegramProvider } from "../contexts/TelegramContext";

import { landingUrl } from "../utils/constant";

import { AlertsCC, GetAlerts } from "../hooks/AlertsHook";
import { ToastCC, ToastHook } from "../hooks/ToastHook";
import NewAlertPopUp from "../Features/AlertsCom/NewAlertModal";
import IntercomSupport from "../Features/IntercomSupporrt";

function MyApp({ Component, pageProps }) {
  const { getAllAlertsHook, alertsHook, newAlerts, setNewAlert } = GetAlerts();

  const { alerts, setAlerts, newAlert } = ToastHook();

  return (
    <Fragment>
      <Chargebee>
        <Head>
          <title>
            Automated Trader – Automate Tradingview… Tradingview to any broker ,
            any alert, any indicator, instantly!
          </title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Palanquin:wght@100;200;300;400;500;600;700&family=Shippori+Antique&family=Sofia+Sans:ital,wght@0,1..1000;1,1..1000&display=swap"
            rel="stylesheet"
          />
        </Head>

        <ThemeProvider>
          <UserProvider>
            <Main>
              <ToastCC value={{ newAlert }}>
                <AlertsCC value={{ alertsHook }}>
                  <Component {...pageProps} />
                  <NewAlertPopUp
                    newAlert={newAlerts}
                    setNewAlert={setNewAlert}
                  />
                </AlertsCC>
              </ToastCC>
            </Main>
          </UserProvider>
        </ThemeProvider>
      </Chargebee>
    </Fragment>
  );
}

export default MyApp;

function Main({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const { subscription } = router.query;

  const { user, fullUser } = useUser();

  const [firstPath, setFirstPath] = useState(null);

  useEffect(() => {
    if (!firstPath) setFirstPath(pathname);
  }, []);

  useEffect(() => {
    if (fullUser !== undefined) {
      // console.log(user);
      if (user && fullUser) {
        const subObj = fullUser?.subObj;

        if (subObj && pathname === "/welcome") router.push("/home");
        // console.log(subObj);
        if (!subObj) {
          router.push("/waiting");
          // router.push("/welcome");
        } else if (
          pathname === "/" ||
          pathname === "/signin" ||
          pathname === "/signup" ||
          pathname === "/forgetpassword"
        ) {
          if (
            firstPath === "/" ||
            firstPath === "/signin" ||
            firstPath === "/signup" ||
            firstPath === "/forgetpassword"
          ) {
            if (!subscription) router.push("/home");
            else router.push("/membership?m=" + subscription);
          } else {
            if (!subscription) router.push(firstPath);
            else router.push("/membership?m=" + subscription);
          }
        }
      } else if (user === null) {
        if (
          pathname !== "/signin" &&
          pathname !== "/signup" &&
          // pathname !== "/" &&
          pathname !== "/forgetpassword" &&
          pathname.search("/profile/") === -1 &&
          pathname.search("/webhook/") === -1
          // "/" !== landingUrl
        )
          router.push(landingUrl);
      }
    }
    if (user === null) {
      if (
        pathname !== "/signin" &&
        pathname !== "/signup" &&
        // pathname !== "/" &&
        pathname !== "/forgetpassword" &&
        pathname.search("/profile/") === -1 &&
        pathname.search("/webhook/") === -1
        // "/" !== landingUrl
      )
        router.push(landingUrl);
    }
  }, [user, fullUser]);

  return (
    <Fragment>
      {fullUser === undefined && user === undefined ? (
        <Fragment>
          <LoadingPage />
        </Fragment>
      ) : (
        <Fragment>
          <NotificationProvider>
            <MetatraderProvider>
              <BinanceProvider>
                <WebhookProvider>
                  <TelegramProvider>
                    <AlertProvider>{children}</AlertProvider>
                  </TelegramProvider>
                </WebhookProvider>
              </BinanceProvider>
            </MetatraderProvider>
          </NotificationProvider>
        </Fragment>
      )}

      <IntercomSupport user={fullUser} />
    </Fragment>
  );
}

function LoadingPage() {
  const { theme } = useTheme();
  return (
    <div className="bg-bgt text-black w-full h-screen flex flex-col justify-center items-center">
      <div className="container flex flex-col items-center justify-center mx-auto">
        <img
          className="object-cover object-center w-3/4 mb-10 g327 m-4"
          alt="Placeholder Image"
          src={
            theme === "light" ? "/Logo/dark-logo.png" : "/Logo/light-logo.png"
          }
        ></img>
      </div>
    </div>
  );
}

function Chargebee({ children }) {
  const [load, setLoad] = useState(false);
  // const { setChargeBee } = GetChargeBeeContext();

  return (
    <Fragment>
      <Script
        src="https://js.chargebee.com/v2/chargebee.js"
        onLoad={() => {
          window?.Chargebee?.init({
            site: process.env.NEXT_PUBLIC_CHARGEBEE_SITE,
            publishableKey: process.env.NEXT_PUBLIC_CHARGEBEE_API_KEY,

            isItemsModel: true,
          });

          // get cb Instance
          let cbInstance = window?.Chargebee?.getInstance();
          // console.log(cbInstance);
          // setChargeBee(cbInstance);
          setLoad(true);
        }}
        onError={(e) => {
          console.log("Error getting chargebee instance ...", e);
          setLoad(true);
        }}
      ></Script>
      {load && children}
    </Fragment>
  );
}
