import "../styles/globals.css";
import "../styles/sidenav.css";
import "../styles/landing.css";

import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";
import { checkUser } from "../db/sign";

import { UserCC } from "../hooks/UserHook";
import { WebHookCC, GetWebhook } from "../hooks/WebHook";
import { AlertsCC, GetAlerts } from "../hooks/AlertsHook";
import { MTAccountsCC, GetMTAccounts } from "../hooks/MTAccounts";
import { ToastCC, ToastHook } from "../hooks/ToastHook";

import Toasti from "../Features/Toast";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
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
      if (pathname === "/") router.push("/profile");
    } else if (!user) {
      if (pathname === "/profile") router.push("/");
      else if (pathname === "/settings") router.push("/");
    }

    if (user) {
      getAllWebhooks(user?.uid);
      getAllAlertsHook(user?.uid);
      getAllMTAccounts(user?.uid);
    } else {
      setAlerts([]);
    }
  }, [user]);

  return (
    <Fragment>
      <ToastCC value={{ newAlert }}>
        <UserCC value={{ user, setUser }}>
          <WebHookCC
            value={{ webhooks, getAllWebhooks, setWebhooks, changeWebhookData }}
          >
            <AlertsCC value={{ alertsHook }}>
              <MTAccountsCC value={{ mtAccounts }}>
                <Component {...pageProps} />
              </MTAccountsCC>
            </AlertsCC>
          </WebHookCC>
        </UserCC>
      </ToastCC>

      <Toasti alerts={alerts} setAlerts={setAlerts} />
    </Fragment>
  );
}

export default MyApp;
