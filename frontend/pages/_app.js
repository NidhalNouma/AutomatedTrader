import "../styles/globals.css";
import "../styles/landing.css";

import Head from "next/head";
import Script from "next/script";
import { useState, useEffect, Fragment } from "react";

import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { UserProvider, useUser } from "../contexts/UserContext";
import { NotificationProvider } from "../contexts/NotificationContext";
import { WebhookProvider } from "../contexts/WebhookContext";
import { PresetsProvider } from "../contexts/PresetsContext";
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
      {/* <Chargebee> */}
      <Sellix>
        <Head>
          <title>
            Automated Trader – Automate Tradingview… Tradingview to any broker ,
            any alert, any indicator, instantly!
          </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          ></meta>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Palanquin:wght@100;200;300;400;500;600;700&family=Shippori+Antique&family=Sofia+Sans:ital,wght@0,1..1000;1,1..1000&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://cdn.sellix.io/static/css/embed.css"
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
      </Sellix>
      {/* </Chargebee> */}
    </Fragment>
  );
}

export default MyApp;

function Main({ children }) {
  const { fullUser, loading } = useUser();

  return (
    <Fragment>
      {loading ? (
        <Fragment>
          <LoadingPage />
        </Fragment>
      ) : (
        <Fragment>
          <NotificationProvider>
            <MetatraderProvider>
              <BinanceProvider>
                <WebhookProvider>
                  <PresetsProvider>
                    <TelegramProvider>
                      <AlertProvider>{children}</AlertProvider>
                    </TelegramProvider>
                  </PresetsProvider>
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

function Sellix({ children }) {
  const [load, setLoad] = useState(false);
  // const { setChargeBee } = GetChargeBeeContext();

  return (
    <Fragment>
      <Script
        src="https://cdn.sellix.io/static/js/embed.js"
        onLoad={() => {
          window?.initializeSellixEmbed();
          setLoad(true);
        }}
        onError={(e) => {
          console.log("Error getting sellix instance ...", e);
          setLoad(true);
        }}
      ></Script>
      {load && children}
    </Fragment>
  );
}
