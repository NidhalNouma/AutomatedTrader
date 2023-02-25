import "../styles/globals.css";
import "../styles/sidenav.css";
import "../styles/landing.css";

import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";
import { checkUser } from "../db/sign";

import { UserCC, FullUserCC, GetFullUser } from "../hooks/UserHook";
import { WebHookCC, GetWebhook } from "../hooks/WebHook";
import { AlertsCC, GetAlerts } from "../hooks/AlertsHook";
import { MTAccountsCC, GetMTAccounts } from "../hooks/MTAccounts";
import { ToastCC, ToastHook } from "../hooks/ToastHook";

import Toasti from "../Features/Toast";
import { landingUrl } from "../utils/constant";
import LoadingPage from "../Features/LoadingPage";

import Chargebee from "../Features/chargeBee/ChargeBee";
// import { ChargeBeeCC, GetChargeBee } from "../hooks/ChargeBee";
import { GoogleAnalytics } from "nextjs-google-analytics";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { fullUser, getFullUser, setFullUser } = GetFullUser();
  const { webhooks, getAllWebhooks, setWebhooks, changeWebhookData } =
    GetWebhook();
  const { getAllAlertsHook, alertsHook } = GetAlerts();
  const { mtAccounts, setMTAccounts, getAllMTAccounts, getData } =
    GetMTAccounts();

  const { alerts, setAlerts, newAlert } = ToastHook();
  // const { openDrawer, toggleOpenDrawer } = GetDrawer();

  const [load, setLoading] = useState(true);
  const [firstPath, setFirstPath] = useState(null);

  // const { chargeBee, setChargeBee, openCheckout } = GetChargeBee();

  useEffect(() => {
    checkUser(setUser, () => setLoading(false));
  }, []);

  useEffect(() => {
    const { pathname } = router;
    if (!firstPath) setFirstPath(pathname);
    if (user) {
      if (
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
        )
          router.push("/home");
        else router.push(firstPath);
      }
    } else if (!user) {
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

    if (user) {
      getFullUser(user?.uid, () => setLoading(false));
      getAllWebhooks(user?.uid);
      getAllAlertsHook(user?.uid);
      getAllMTAccounts(user?.uid);
    } else {
      setAlerts([]);
    }
  }, [user]);

  return (
    <Fragment>
      <GoogleAnalytics trackPageViews />
      {/* <ChargeBeeCC value={{ chargeBee, setChargeBee, openCheckout }}> */}
      <Chargebee>
        <Head>
          <title>Automated trader</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        {load ? (
          <LoadingPage />
        ) : (
          <Fragment>
            <ToastCC value={{ newAlert }}>
              <UserCC value={{ user, setUser }}>
                <FullUserCC value={{ fullUser, setFullUser, getFullUser }}>
                  <WebHookCC
                    value={{
                      webhooks,
                      getAllWebhooks,
                      setWebhooks,
                      changeWebhookData,
                    }}
                  >
                    <AlertsCC value={{ alertsHook }}>
                      <MTAccountsCC
                        value={{ mtAccounts, setMTAccounts, getData }}
                      >
                        <Component {...pageProps} />
                      </MTAccountsCC>
                    </AlertsCC>
                  </WebHookCC>
                </FullUserCC>
              </UserCC>
            </ToastCC>
            <Toasti alerts={alerts} setAlerts={setAlerts} />
          </Fragment>
        )}
      </Chargebee>
      {/* </ChargeBeeCC> */}
    </Fragment>
  );
}

export default MyApp;
