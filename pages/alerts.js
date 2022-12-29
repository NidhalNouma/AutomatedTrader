import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";
import Alerts from "../Features/AlertsCom";

import { H1, Hi6, H4 } from "../Components/H";

import { GetAlertsContext } from "../hooks/AlertsHook";

export default function AlertsPage() {
  const { alertsHook } = GetAlertsContext();
  return (
    <>
      <Sidenav cpath="alerts" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-5 md:px-10 py-6 overflow-x-hidden">
          <H1>Alerts</H1>
          <div className="w-full lg:w-1/2 mt-4">
            <Alerts alertsHook={alertsHook} />
          </div>
        </div>
      </div>
    </>
  );
}
