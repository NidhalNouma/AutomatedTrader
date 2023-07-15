export function copyTextToClipboard(text, succesFn, failFn) {
  if (!navigator.clipboard) {
    failFn();
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
      succesFn();
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
      failFn();
    }
  );
}

export function txtColorFromBg(bgColor, darkTxt = "#000", lightTxt = "#fff") {
  if (!bgColor) return bgColor;
  if (bgColor.search("#") >= 0) bgColor = hexToRgbA(bgColor);

  const rgb = bgColor
    .substring(4, bgColor.length - 1)
    .replace(/ /g, "")
    .split(",");

  const brightness = Math.round(
    (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) /
      1000
  );

  const textColor = brightness > 125 ? darkTxt : lightTxt;

  return textColor;
}

function hexToRgbA(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

export function addAlpha(color, opacity) {
  //   // coerce values so ti is between 0 and 1.
  //   var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  //   return color + _opacity.toString(16).toUpperCase();

  // console.log("color", color + "00");
  if (color.search("#") >= 0) color = hexToRgbA(color);
  const r = color.replace(/[\d\.]+\)$/g, opacity);

  let new_col = color.replace(/rgb/i, "rgba");
  new_col = new_col.replace(/\)/i, "," + opacity.toString() + ")");
  // console.log(r, color, new_col);

  return new_col;
}

export function numToFixed(num) {
  let value = Number(num);
  let res = String(num).split(".");

  // console.log(value, res);
  if (num === 0) return num.toFixed(1);

  if (res.length > 1) {
    if (res[0] > 0) return num.toFixed(1);
    else {
      let s = 1;

      let str = res[1].toString();

      for (let i in str) {
        if (str[i] === "0") s += 1;
        else break;
        //answer += Math.pow(str[i], Number(i) + 1);
      }

      return Number(num).toFixed(s);
    }
  }

  return Number(value);
}
