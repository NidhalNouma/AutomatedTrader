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
