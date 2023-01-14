import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";
import Alerts from "../Features/AlertsCom";

import { H1, Hi6, H4 } from "../Components/H";

import { GetAlertsContext } from "../hooks/AlertsHook";

export default function AlertsPage() {
  const { alertsHook } = GetAlertsContext();
  return (
    <>
      <Sidenav cpath="alerts" />
      <MainWithHeader>
        <H1>Alerts</H1>
        <div className="w-full lg:w-1/2 mt-4">
          <Alerts alertsHook={alertsHook} />
        </div>
      </MainWithHeader>
    </>
  );
}
