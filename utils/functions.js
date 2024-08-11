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
  // Ensure opacity is within the valid range
  if (opacity < 0) opacity = 0;
  if (opacity > 1) opacity = 1;

  // Check if the color is in hex format
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
    // If the color is in shorthand hex format, expand it to full hex format
    if (color.length === 4) {
      color =
        "#" +
        color
          .slice(1)
          .split("")
          .map((char) => char + char)
          .join("");
    }
    // Convert hex to rgba
    const bigint = parseInt(color.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Check if the color is in rgb or rgba format
  if (
    /^rgba?\((\d{1,3}), (\d{1,3}), (\d{1,3})(, ([0-9]*[.])?[0-9]+)?\)$/.test(
      color
    )
  ) {
    return color.replace(
      /rgba?\((\d{1,3}), (\d{1,3}), (\d{1,3})(, ([0-9]*[.])?[0-9]+)?\)/,
      `rgba($1, $2, $3, ${opacity})`
    );
  }

  // Check if the color is in hsl or hsla format
  if (
    /^hsla?\((\d{1,3}), (\d{1,3})%, (\d{1,3})%(, ([0-9]*[.])?[0-9]+)?\)$/.test(
      color
    )
  ) {
    return color.replace(
      /hsla?\((\d{1,3}), (\d{1,3})%, (\d{1,3})%(, ([0-9]*[.])?[0-9]+)?\)/,
      `hsla($1, $2%, $3%, ${opacity})`
    );
  }

  // If the color format is not recognized, return the original color
  return color;
}

export function numToFixed(num) {
  let value = Number(num);
  let res = String(num).split(".");

  // console.log(value, res);
  if (num === 0) return Number(num).toFixed(1);

  if (res.length > 1) {
    if (res[0] > 0) return Number(num).toFixed(1);
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

export function getRandomHexColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getRandomRgbColor() {
  // var letters = "0123456789ABCDEF";
  // var color = "#";
  // for (var i = 0; i < 6; i++) {
  //   color += letters[Math.floor(Math.random() * 16)];
  // }
  // return color;
  var o = Math.round,
    r = Math.random,
    red = 155,
    green = 170,
    blue = 255;
  return (
    "rgba(" +
    o(r() * red) +
    "," +
    o(r() * green) +
    "," +
    o(r() * blue) +
    "," +
    r().toFixed(1) +
    ")"
  );
}
export function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export const getAssetImageUrl = (asset) => {
  return `/icons/crypto/color/${asset.toLowerCase()}.svg`;
};
