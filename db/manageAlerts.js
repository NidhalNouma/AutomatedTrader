let alerts = [];

export function newAlert(id, data) {
  let n = { id, data: [data] };
  console.log("New alert for MT => ", data.MT4, data.messageData);

  const f = alerts.find(function (v, i) {
    return v.id === id;
  });

  if (f) {
    alerts = alerts.filter(function (v, i) {
      return v.id !== id;
    });
    n = { id, data: [data, ...f.data] };
    alerts.push(n);
    removeAfterXs(id);
  } else {
    alerts.push(n);
  }
}

export function getAlertByUserId(id) {
  // removeAfterXs(id);
  const r = [];
  alerts.forEach(function (v, i) {
    removeAfterXs(v.id);
    const s = v.data.length;
    for (let j = 0; j < s; j++) {
      const d = v.data[j];
      if (d.userId === id) r.push({ ...d, id: v.id });
    }
  });

  return r;
}

export function getAlert(id) {
  removeAfterXs(id);
  const f = alerts.find(function (v, i) {
    return v.id === id;
  });

  return f;
}

function removeAfterXs(id, sec = 30) {
  const i = alerts.findIndex((obj) => obj.id === id);
  let t = new Date();
  t = new Date(t.getTime() - 1000 * sec);

  //   console.log(i, t, new Date());
  if (i >= 0) {
    const nd = alerts[i].data.filter(function (v) {
      return v.time > t;
    });

    alerts[i].data = nd;
  }
}

export function webhookTime(time) {
  const timeEst = changeTimeZone(new Date(), "America/New_York");
  console.log("Checking time ... ", timeEst);

  if (time?.use) {
    const day = timeEst.getDay();
    if (day === 0 && !time.day?.find((v) => v === "SUN")) return false;
    if (day === 1 && !time.day?.find((v) => v === "MON")) return false;
    if (day === 2 && !time.day?.find((v) => v === "TUE")) return false;
    if (day === 3 && !time.day?.find((v) => v === "WED")) return false;
    if (day === 4 && !time.day?.find((v) => v === "THI")) return false;
    if (day === 5 && !time.day?.find((v) => v === "FRI")) return false;
    if (day === 6 && !time.day?.find((v) => v === "SAT")) return false;

    if (time?.start) {
      const t = time.start?.split(":");
      const stime = new Date(timeEst);
      stime.setHours(Number(t[0]));
      if (t.length === 2) stime.setMinutes(Number(t[1]));

      // console.log(stime.getHours(), timeEst.getHours(), stime > timeEst);

      if (stime > timeEst) return false;
    }
    if (time?.end) {
      const t = time.end?.split(":");
      const etime = new Date(timeEst);
      etime.setHours(Number(t[0]));
      if (t.length === 2) etime.setMinutes(Number(t[1]));

      // console.log(etime.getHours(), timeEst.getHours());

      if (etime < timeEst) return false;
    }
    return true;
  } else return true;

  return false;
}

function changeTimeZone(date, timeZone) {
  if (typeof date === "string") {
    return new Date(
      new Date(date).toLocaleString("en-US", {
        timeZone,
      })
    );
  }

  return new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );
}
