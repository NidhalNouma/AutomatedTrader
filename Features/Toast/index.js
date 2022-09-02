import { Toast, Alert, Button } from "react-daisyui";

function Toasti({ alerts, setAlerts }) {
  const handleRemoveToast = (index) => {
    setAlerts((alerts) => alerts.filter((_, i) => i !== index));
  };

  return (
    <Toast horizontal="end" vertical="bottom">
      {alerts?.map((alert, index) => (
        <Alert key={index} status={alert.status} className="py-1">
          <div className="w-full flex-row justify-between gap-2">
            <h3>{alert.text}</h3>
          </div>
          <Button color="ghost" onClick={() => handleRemoveToast(index)}>
            X
          </Button>
        </Alert>
      ))}
    </Toast>
  );
}

export default Toasti;
