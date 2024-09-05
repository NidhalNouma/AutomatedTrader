import { Fragment, useState } from "react";

import { withAuth } from "../contexts/UserContext";
import moment from "moment";
import { MainLayoutWithHeader } from "../components/layout/MainLayout";

import { SubTitle3 } from "../components/ui/Text";

import Alert from "../components/parts/AlertStatus";

import { useAlert } from "../contexts/AlertContext";
import { SortAlertsByDays } from "../hooksp/AlertHook";

function AlertsPage() {
  const { alerts } = useAlert();
  const { daysAlerts } = SortAlertsByDays(alerts);
  const [open, setOpen] = useState(false);

  // console.log(alerts);

  return (
    <Fragment>
      <MainLayoutWithHeader title="Alerts" page="alerts">
        {daysAlerts?.length > 0 ? (
          daysAlerts.map((group, i) => (
            <div className="w-full lg:w-1/2i mt-4" key={i}>
              <SubTitle3 className="mb-2">
                {moment(group.time).isSame(moment(), "day")
                  ? "Today"
                  : moment(group.time).isSame(
                      moment().subtract(1, "day"),
                      "day"
                    )
                  ? "Yesterday"
                  : group.time}
              </SubTitle3>
              {group.alerts.map((alert, i) => (
                <Alert key={i} alert={alert} />
              ))}
            </div>
          ))
        ) : (
          <div className="mt-6 w-full">{/* <AlertsWelcome /> */}</div>
        )}
      </MainLayoutWithHeader>
      {/* <div className="flex items-center">
          <SubTitle>Alerts</SubTitle>

          <AiFillSetting
            onClick={() => setOpen(true)}
            className="ml-3 stroke-4 cursor-pointer h-5 w-5 p-0.5 bg-text-p rounded-full text-bg"
          />
        </div>


        <Modal1
          open={open}
          close={() => {
            setOpen(false);
          }}
        >
          <SettingModal close={() => setOpen(false)} />
        </Modal1> */}
    </Fragment>
  );
}

export default withAuth(AlertsPage);
