import { Fragment, useEffect } from "react";
import { Button } from "react-daisyui";
import Router from "next/router";

function Side({ ty, setTy }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [ty]);

  return (
    <div className="flex flex-col items-start w-32">
      <Button
        size="sm"
        className={`mb-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 0 && "text-primary"
        }`}
        onClick={() => Router.push("/docs/aboutus")}
      >
        About Us
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty >= 1 && ty < 2 && "text-primary"
        }`}
        onClick={() => Router.push("/docs/webhooks")}
      >
        Webhooks
      </Button>
      {ty >= 1 && ty < 2 && (
        <Fragment>
          <Button
            size="sm"
            className={`truncate my-0 capitalize !text-xs text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
              ty === 1.1 && "text-primary"
            }`}
            // onClick={() => setTy(1.1)}
          >
            In AutomateTrader
          </Button>
          <Button
            size="sm"
            className={`truncate my-0 capitalize !text-xs text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
              ty === 1.2 && "text-primary"
            }`}
            // onClick={() => setTy(1.2)}
          >
            In TradingView
          </Button>
        </Fragment>
      )}
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty >= 2 && ty < 3 && "text-primary"
        }`}
        onClick={() => Router.push("/docs/metatrader")}
      >
        Metatrader
      </Button>
      {ty >= 2 && ty < 3 && (
        <Fragment>
          <Button
            size="sm"
            className={`truncate my-0 capitalize !text-xs text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
              ty === 2.1 && "text-primary"
            }`}
            // onClick={() => setTy(2.1)}
          >
            Adding account
          </Button>
          <Button
            size="sm"
            className={`truncate my-0 capitalize !text-xs text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
              ty === 2.2 && "text-primary"
            }`}
            // onClick={() => setTy(2.2)}
          >
            Adding webhook
          </Button>
        </Fragment>
      )}
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 6 && "text-primary"
        }`}
        onClick={() => Router.push("/docs/manual")}
      >
        Manual
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 7 && "text-primary"
        }`}
        onClick={() => Router.push("/docs/trade")}
      >
        Trade
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 8 && "text-primary"
        }`}
        onClick={() => Router.push("/docs/alerts")}
      >
        Alerts
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 5 && "text-primary"
        }`}
        onClick={() => Router.push("/docs/telegram")}
      >
        Telegram
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 4 && "text-primary"
        }`}
        onClick={() => Router.push("/docs/faq")}
      >
        FAQ
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 9 && "text-primary"
        }`}
        onClick={() => Router.push("/docs/propfirm")}
      >
        Prop firm
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 10 && "text-primary"
        }`}
        onClick={() => Router.push("/docs/vps")}
      >
        VPS
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 3 && "text-primary"
        }`}
        onClick={() => Router.push("/docs/roadmap")}
      >
        Road map
      </Button>
    </div>
  );
}

export default Side;
