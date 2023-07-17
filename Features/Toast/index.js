import { Fragment, useState, useEffect } from "react";
import { Toast, Alert } from "react-daisyui";
import { XIcon } from "@heroicons/react/solid";

function Toasti({ alerts, setAlerts }) {
  const handleRemoveToast = (index) => {
    setAlerts((alerts) => alerts.filter((_, i) => i !== index));
  };

  // const alert = alerts[alerts.length - 1];

  return (
    <Toast horizontal="start" vertical="bottom" className="z-[999]">
      {alerts?.map((alert, index) => (
        <DAlert
          key={index}
          alert={alert}
          close={() => handleRemoveToast(index)}
        />
      ))}
    </Toast>
  );
}

export default Toasti;

const DAlert = ({ alert, close, time = 3000 }) => {
  const [showElement, setShowElement] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, time);
  }, []);

  return (
    <Fragment>
      {showElement && (
        <Alert status={alert.status} className="p-3 toastDiv rounded-xl">
          <div className="w-full flex-row justify-between gap-2">
            <p className="font-semibold whitespace-nowrap text-sm">
              {alert.text}
            </p>
          </div>
          <button className="" onClick={close}>
            <XIcon className="h-4 w-4 cursor-pointer" />
          </button>
        </Alert>
      )}
    </Fragment>
  );
};
