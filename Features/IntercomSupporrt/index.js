import { Fragment, useEffect } from "react";
import Script from "next/script";

function Index({ user }) {
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

export default Index;
