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
