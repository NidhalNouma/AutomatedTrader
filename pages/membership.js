import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";

import Pricing from "../Features/Pricing";
import { H1 } from "../Components/H";

import PaddleLoader from "../Features/Paddle";

export default function membership() {
  return (
    <>
      <Sidenav cpath="membership" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-10 py-6">
          <H1>Membership</H1>
          <div className="mt-6">
            <section className="container mx-auto flex flex-wrap">
              <Pricing title="BASIC" />
              <Pricing title="STANDARD" />
              <Pricing title="PROFESSIONAL" />
              <Pricing title="PREMIUM" />
            </section>
          </div>
        </div>
      </div>
      <PaddleLoader />
    </>
  );
}
