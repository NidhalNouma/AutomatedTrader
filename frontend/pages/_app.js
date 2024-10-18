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

import { pricingList } from "../utils/pricing";

function MyApp({ Component, pageProps }) {
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
              {/* <ToastCC value={{ newAlert }}>
                <AlertsCC value={{ alertsHook }}> */}
              <Component {...pageProps} />
              {/* <NewAlertPopUp
                    newAlert={newAlerts}
                    setNewAlert={setNewAlert}
                  /> */}
              {/* </AlertsCC>
              </ToastCC> */}
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

  const renderButtons = (pricingList) => {
    // Loop over each period (monthly, annual, lifetime)
    Object.entries(pricingList).forEach(([period, plans]) => {
      // Loop over each plan
      Object.entries(plans).forEach(([planName, details]) => {
        // Create a new button element
        const button = document.createElement("button");

        // Set button attributes and properties
        button.id = "sellix" + details.sellixId;
        button.setAttribute("data-sellix-product", details.sellixId);
        button.className = "hidden";
        button.type = "submit";
        button.innerText = `${planName} (${period} - $${details.price})`;

        // Append the button to the body
        document.body.appendChild(button);
      });
    });
  };

  return (
    <Fragment>
      <Script
        src="https://cdn.sellix.io/static/js/embed.js"
        onLoad={() => {
          window?.initializeSellixEmbed();
          setLoad(true);
          renderButtons(pricingList);
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

function IntercomSupport({ user }) {
  useEffect(() => {
    if (user) {
      window.intercomSettings = {
        api_base: "https://api-iam.intercom.io",
        app_id: "erbaop8g",
        name: user?.displayName, // Full name
        email: user?.email, // Email address
        // created_at: user?.created_at?.seconds, // Signup date as a Unix timestamp

        user_id: user.id,
      };

      (function () {
        var w = window;
        var ic = w.Intercom;
        if (typeof ic === "function") {
          ic("reattach_activator");
          ic("update", w.intercomSettings);
        } else {
          var d = document;
          var i = function () {
            i.c(arguments);
          };
          i.q = [];
          i.c = function (args) {
            i.q.push(args);
          };
          w.Intercom = i;
          var l = function () {
            var s = d.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.intercom.io/widget/erbaop8g";
            var x = d.getElementsByTagName("script")[0];
            x.parentNode.insertBefore(s, x);
          };
          if (document.readyState === "complete") {
            l();
          } else if (w.attachEvent) {
            w.attachEvent("onload", l);
          } else {
            w.addEventListener("load", l, false);
          }
        }
      })();
    }
    // console.log("Intercom ", user, window.intercom);
  }, [user]);

  return (
    <Fragment>
      {/* {!user ? (
        <Fragment>
          <Script
            onLoad={() => {
              window.intercomSettings = {
                api_base: "https://api-iam.intercom.io",
                app_id: "erbaop8g",
                name: user.displayName, // Full name
                email: user.email, // Email address
                created_at: user.created_at?.seconds, // Signup date as a Unix timestamp
              };

              console.log("Intercome: ", window.intercomSettings);
            }}
          />

          <Script
            onLoad={() => {
              (function () {
                var w = window;
                var ic = w.Intercom;
                if (typeof ic === "function") {
                  ic("reattach_activator");
                  ic("update", w.intercomSettings);
                } else {
                  var d = document;
                  var i = function () {
                    i.c(arguments);
                  };
                  i.q = [];
                  i.c = function (args) {
                    i.q.push(args);
                  };
                  w.Intercom = i;
                  var l = function () {
                    var s = d.createElement("script");
                    s.type = "text/javascript";
                    s.async = true;
                    s.src = "https://widget.intercom.io/widget/erbaop8g";
                    var x = d.getElementsByTagName("script")[0];
                    x.parentNode.insertBefore(s, x);
                  };
                  if (document.readyState === "complete") {
                    l();
                  } else if (w.attachEvent) {
                    w.attachEvent("onload", l);
                  } else {
                    w.addEventListener("load", l, false);
                  }
                }
              })();
            }}
          />
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )} */}
    </Fragment>
  );
}
