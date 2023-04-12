import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";
import Alerts from "../Features/AlertsCom";

import { H1, Hi6, H4 } from "../Components/H";

import { GetAlertsContext } from "../hooks/AlertsHook";
import AlertsWelcome from "../Features/WelcomeSection/Alerts";
import { PlayVideoPopup } from "../Components/Video";
import { videosUrls } from "../utils/constant";

export default function AlertsPage() {
  const { alertsHook } = GetAlertsContext();
  return (
    <>
      <Sidenav cpath="alerts" />
      <MainWithHeader>
        <div className="flex items-center">
          <H1>Alerts</H1>
          {alertsHook?.length > 0 && (
            <PlayVideoPopup
              className="aspect-video w-[100%] mx-auto rounded-xl border-0 border-text-p"
              src={videosUrls.alertsPage}
            />
          )}
        </div>

        {alertsHook?.length > 0 ? (
          <div className="w-full lg:w-1/2 mt-4">
            <Alerts alertsHook={alertsHook} />
          </div>
        ) : (
          <div className="mt-6 w-full">
            <AlertsWelcome />
          </div>
        )}
      </MainWithHeader>
    </>
  );
}
