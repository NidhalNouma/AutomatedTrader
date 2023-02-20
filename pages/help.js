import { useState, useRef } from "react";
import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";
import { H1 } from "../Components/H";
import { ButtonGroup, Button } from "react-daisyui";

import AboutUs from "../Features/Docs/AboutUs";
import Webhooks from "../Features/Docs/Webhooks";
import Metatrader from "../Features/Docs/Metatrader";
import RoadMap from "../Features/Docs/RoadMap";
import Faq from "../Features/Docs/Faq";

export default function Help() {
  const [ty, setTy] = useState(0);

  return (
    <>
      <Sidenav cpath="help" />
      <MainWithHeader>
        <H1>Documentation</H1>
        <div className="mt-6 flex">
          <Side ty={ty} setTy={setTy} />
          <div className="flex-1 px-6 sticky top-0">
            {ty === 0 && <AboutUs />}
            {ty === 1 && <Webhooks />}
            {ty === 2 && <Metatrader />}
            {ty === 4 && <Faq />}
            {ty === 3 && <RoadMap />}
          </div>
        </div>
      </MainWithHeader>
    </>
  );
}

function Side({ ty, setTy }) {
  return (
    <div>
      <ButtonGroup vertical={true}>
        <Button
          className={`capitalize !text-sm rounded-xl bg-bgt ${
            ty === 0 && "text-primary"
          }`}
          onClick={() => setTy(0)}
        >
          About Us
        </Button>
        <Button
          className={`capitalize !text-sm rounded bg-bgt ${
            ty === 1 && "text-primary"
          }`}
          onClick={() => setTy(1)}
        >
          Webhooks
        </Button>
        <Button
          className={`capitalize !text-sm rounded bg-bgt ${
            ty === 2 && "text-primary"
          }`}
          onClick={() => setTy(2)}
        >
          Metatrader
        </Button>
        <Button
          className={`capitalize !text-sm rounded-xl bg-bgt ${
            ty === 4 && "text-primary"
          }`}
          onClick={() => setTy(4)}
        >
          FAQ
        </Button>
        <Button
          className={`capitalize !text-sm rounded-xl bg-bgt ${
            ty === 3 && "text-primary"
          }`}
          onClick={() => setTy(3)}
        >
          Road map
        </Button>
      </ButtonGroup>
    </div>
  );
}
