import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";
import Alerts from "../Features/AlertsCom";
import { useState } from "react";

import { H1, Hi6, H4 } from "../Components/H";

import { GetAlertsContext } from "../hooks/AlertsHook";
import AlertsWelcome from "../Features/WelcomeSection/Alerts";
import { PlayVideoPopup } from "../Components/Video";
import { videosUrls } from "../utils/constant";
import { AiFillSetting } from "react-icons/ai";

import { Modal1 } from "../Components/Modal";
import SettingModal from "../Features/AlertsCom/SettingsModal";

export default function AlertsPage() {
  const { alertsHook } = GetAlertsContext();

  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidenav cpath="alerts" />
      <MainWithHeader>
        <div className="flex items-center">
          <H1>Alerts</H1>

          <AiFillSetting
            onClick={() => setOpen(true)}
            className="ml-3 stroke-4 cursor-pointer h-5 w-5 p-0.5 bg-text-p rounded-full text-bg"
          />

          {/* {alertsHook?.length > 0 && (
            <PlayVideoPopup
              className="aspect-video w-[100%] mx-auto rounded-xl border-0 border-text-p"
              src={videosUrls.alertsPage}
            />
          )} */}
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

        <Modal1
          open={open}
          close={() => {
            setOpen(false);
          }}
        >
          <SettingModal close={() => setOpen(false)} />
        </Modal1>
      </MainWithHeader>
    </>
  );
}
