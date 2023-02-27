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
