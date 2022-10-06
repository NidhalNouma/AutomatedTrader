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

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { fullUser, getFullUser, setFullUser } = GetFullUser();
  const { webhooks, getAllWebhooks, setWebhooks, changeWebhookData } =
    GetWebhook();
  const { getAllAlertsHook, alertsHook } = GetAlerts();
  const { mtAccounts, setMTAccounts, getAllMTAccounts } = GetMTAccounts();

  const { alerts, setAlerts, newAlert } = ToastHook();

  useEffect(() => {
    checkUser(setUser);
  }, []);

  useEffect(() => {
    const { pathname } = router;
    if (user) {
      if (
        pathname === "/" ||
        pathname === "/signin" ||
        pathname === "/signup" ||
        pathname === "/forgetpassword"
      )
        router.push("/profile");
    } else if (!user) {
      if (
        pathname !== "/signin" &&
        pathname !== "/signup" &&
        // pathname !== "/" &&
        pathname !== "/forgetpassword"
        // "/" !== landingUrl
      )
        router.push(landingUrl);
    }

    if (user) {
      getFullUser(user?.uid);
      getAllWebhooks(user?.uid);
      getAllAlertsHook(user?.uid);
      getAllMTAccounts(user?.uid);
    } else {
      setAlerts([]);
    }
  }, [user]);

  return (
    <Fragment>
      <Head>
        <title>Automated trader</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

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
                <MTAccountsCC value={{ mtAccounts }}>
                  <Component {...pageProps} />
                </MTAccountsCC>
              </AlertsCC>
            </WebHookCC>
          </FullUserCC>
        </UserCC>
      </ToastCC>

      <Toasti alerts={alerts} setAlerts={setAlerts} />
    </Fragment>
  );
}

export default MyApp;
