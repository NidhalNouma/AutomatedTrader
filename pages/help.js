import { useState, useEffect } from "react";
import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";
import { H1 } from "../Components/H";
import { ButtonGroup, Button } from "react-daisyui";

import AboutUs from "../Features/Docs/AboutUs";
import Webhooks from "../Features/Docs/Webhooks";
import Metatrader from "../Features/Docs/Metatrader";
import RoadMap from "../Features/Docs/RoadMap";
import Faq from "../Features/Docs/Faq";
import Telegram from "../Features/Docs/Telegram";
import Manual from "../Features/Docs/Manual";
import Trade from "../Features/Docs/Trade";
import Alerts from "../Features/Docs/Alerts";

export default function Help() {
  const [ty, setTy] = useState(0);

  return (
    <>
      <Sidenav cpath="help" />
      <MainWithHeader mainClassName="!overflow-x-clip">
        <H1>Documentation</H1>
        <div className="mt-6 flex">
          <div className="sticky top-20 sm:top-[5.5rem] h-[50vh]">
            <Side ty={ty} setTy={setTy} />
          </div>
          <div className="flex-1 px-6">
            {ty === 0 && <AboutUs />}
            {ty === 1 && <Webhooks />}
            {ty === 2 && <Metatrader />}
            {ty === 4 && <Faq />}
            {ty === 3 && <RoadMap />}
            {ty === 5 && <Telegram />}
            {ty === 6 && <Manual />}
            {ty === 7 && <Trade />}
            {ty === 8 && <Alerts />}
          </div>
        </div>
      </MainWithHeader>
    </>
  );
}

function Side({ ty, setTy }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [ty]);

  return (
    <div className="flex flex-col items-start">
      <Button
        size="sm"
        className={`mb-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 0 && "text-primary"
        }`}
        onClick={() => setTy(0)}
      >
        About Us
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 1 && "text-primary"
        }`}
        onClick={() => setTy(1)}
      >
        Webhooks
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 2 && "text-primary"
        }`}
        onClick={() => setTy(2)}
      >
        Metatrader
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 6 && "text-primary"
        }`}
        onClick={() => setTy(6)}
      >
        Manual
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 7 && "text-primary"
        }`}
        onClick={() => setTy(7)}
      >
        Trade
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 8 && "text-primary"
        }`}
        onClick={() => setTy(8)}
      >
        Alerts
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 5 && "text-primary"
        }`}
        onClick={() => setTy(5)}
      >
        Telegram
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 4 && "text-primary"
        }`}
        onClick={() => setTy(4)}
      >
        FAQ
      </Button>
      <Button
        size="sm"
        className={`my-1 capitalize !text-sm text-text-p border-none hover:bg-transparent hover:text-primary rounded-xl bg-bgt ${
          ty === 3 && "text-primary"
        }`}
        onClick={() => setTy(3)}
      >
        Road map
      </Button>
    </div>
  );
}
