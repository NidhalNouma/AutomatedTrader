// import Redis from "ioredis";
// import { REDIS } from "../utils/constant";

// const redis = new Redis({
//   host: REDIS.host,
//   port: REDIS.port,
//   password: REDIS.password,
// });

// async function newDoc(id, doc, seconds = 20) {
//   try {
//     const result = await redis.get(id);
//     if (result) {
//       let existingArray = JSON.parse(result);

//       existingArray.push(doc);
//       const updatedJsonString = JSON.stringify(existingArray);

//       await redis.set(id, updatedJsonString);
//       await redis.expire(id, seconds);
//     } else {
//       const jsonString = JSON.stringify([doc]);
//       await redis.set(id, jsonString);
//       await redis.expire(id, seconds);
//     }
//   } catch (error) {
//     console.error("redis error ", error);
//   }
// }

// async function getDoc(id) {
//   let r = [];
//   try {
//     const req = await redis.get(id);
//     if (req) {
//       r = JSON.parse(req);
//       r = r.reverse();
//     }
//   } catch (err) {
//     console.error(err);
//   }
//   return r;
// }

// export async function newAlert(id, data) {
//   let n = { id, data: [data] };
//   console.log("New alert for MT => ", data.userId, data.MT4, data.messageData);

//   newDoc(data.userId, data);
//   // removeAfterXs(id);
// }

// export async function getAlertByUserId(id) {
//   // removeAfterXs(id);
//   const r = await getDoc(id);

//   return r;
// }

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
