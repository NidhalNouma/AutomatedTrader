import "../styles/globals.css";
import "../styles/sidenav.css";
import "../styles/landing.css";

import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";
import { checkUser } from "../db/sign";

import { UserCC } from "../hooks/UserHook";
import { WebHookCC, GetWebhook } from "../hooks/WebHook";
import { ToastCC, ToastHook } from "../hooks/ToastHook";

import Toasti from "../Features/Toast";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { webhooks, getAllWebhooks, setWebhooks } = GetWebhook();

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
    }
  }, [user]);

  return (
    <Fragment>
      <ToastCC value={{ newAlert }}>
        <UserCC value={{ user, setUser }}>
          <WebHookCC value={{ webhooks, getAllWebhooks, setWebhooks }}>
            <Component {...pageProps} />
          </WebHookCC>
        </UserCC>
      </ToastCC>

      <Toasti alerts={alerts} setAlerts={setAlerts} />
    </Fragment>
  );
}

export default MyApp;
