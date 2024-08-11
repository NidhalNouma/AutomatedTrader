import { Fragment } from "react";
import { MainLayout } from "../components/layout/MainLayout";

// import { Hi2, Hi3, Hi4, H4 } from "../components/H";
// import MegaSale from "../Features/Banners/MegaSale";
// import { pricingList } from "../utils/pricing";

// import HomeSteps from "../Features/HomeSteps";
// import IncomeSteps from "../Features/HomeSteps/IncomeSteps";
import { useUser } from "../contexts/UserContext";

export default function Home() {
  // const { user } = GetUserContext();
  const { fullUser } = useUser();

  return (
    <Fragment>
      <MainLayout page="home"> </MainLayout>
      {/* <Sidenav cpath="home" />
      <MainWithHeader withBanners={false}>
        {fullUser?.subObj?.chargeBeeId !==
          pricingList.lifetime["Lifetime access"].chargeBeeId && <MegaSale />}
        <Hi2 className="font-bold">
          Hi, <span className="text-text-h">{fullUser?.displayName}</span>
        </Hi2>
        <div className="my-4">
          <HomeSteps />
          <div className="mt-16">
            <IncomeSteps />
          </div>
        </div>
      </MainWithHeader> */}
    </Fragment>
  );
}
