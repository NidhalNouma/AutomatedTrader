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
