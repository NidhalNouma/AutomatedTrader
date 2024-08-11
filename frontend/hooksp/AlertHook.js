import { useEffect, useState } from "react";
import moment from "moment";

export function SortAlertsByDays(alerts) {
  const [daysAlerts, setDaysAlerts] = useState([]);

  const groupAlertsByDay = (alerts) => {
    const groupedAlerts = alerts.reduce((acc, alert) => {
      const day = moment(alert.updated_at.toDate()).format("YYYY-MM-DD");
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(alert);
      return acc;
    }, {});

    const sortedArray = Object.keys(groupedAlerts).map((day) => ({
      time: day,
      alerts: groupedAlerts[day],
    }));

    return sortedArray;
  };

  useEffect(() => {
    const nAlerts = groupAlertsByDay(alerts);
    setDaysAlerts(nAlerts);
  }, [alerts]);

  return { daysAlerts };
}
