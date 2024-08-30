import { useEffect, useState } from "react";
import moment from "moment";
import { addAlpha } from "../utils/functions";
import { useAlert } from "../contexts/AlertContext";

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

export function AlertsData() {
  const { alerts } = useAlert();
  const [alertsData, setAlertsData] = useState(null);

  useEffect(() => {
    if (alerts?.length > 0) setAlertsData(processAlerts(alerts));
  }, [alerts]);

  return { alerts, alertsData };
}

export function processAlerts(alerts) {
  const result = {
    days: [],
    nTypes: { 0: 0, 1: 0, 2: 0, 3: 0 },
    symbols: {},
    apps: {},
    dayOfTheWeek: {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
  };

  const dayMap = {};

  alerts.forEach((alert) => {
    const date = new Date(alert.created_at.seconds * 1000); // Convert Firebase timestamp to JavaScript Date
    const day = moment(date).format("YYYY-MM-DD"); // Extract the day in YYYY-MM-DD format
    const dayName = moment(date).format("dddd"); // Get the day of the week

    if (!dayMap[day]) {
      dayMap[day] = {
        day: day,
        numberOfAlerts: 0,
        ntype: { 0: 0, 1: 0, 2: 0, 3: 0 },
        apps: {},
        symbols: {},
      };
    }

    // Update day-specific data
    dayMap[day].numberOfAlerts += 1;
    dayMap[day].ntype[alert.type] += 1;

    alert.apps.forEach((app) => {
      dayMap[day].apps[app.accountSrc] =
        (dayMap[day].apps[app.accountSrc] || 0) + 1;
      result.apps[app.accountSrc] = (result.apps[app.accountSrc] || 0) + 1;
    });

    dayMap[day].symbols[alert.symbol] =
      (dayMap[day].symbols[alert.symbol] || 0) + 1;

    // Update overall data
    result.nTypes[alert.type] += 1;
    result.symbols[alert.symbol] = (result.symbols[alert.symbol] || 0) + 1;

    // Add the alert to the appropriate day of the week
    result.dayOfTheWeek[dayName].push(alert);
  });

  result.days = Object.values(dayMap).sort(
    (a, b) => new Date(a.day) - new Date(b.day)
  );

  return result;
}
