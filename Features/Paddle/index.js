import React from "react";
import Script from "next/script";

function PaddleLoader() {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/paddle.js"
      onLoad={() => {
        Paddle.Environment.set("sandbox");
        Paddle.Setup({
          vender: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR),
          eventCallback: function (data) {
            console.log("paddle", data);
            // The data.event will specify the event type
            if (data.event === "Checkout.Loaded") {
              console.log("paddle loaded ", data.eventData); // Data specifics on the event
            } else if (data.event === "Checkout.Complete") {
              console.log(data.eventData); // Data specifics on the event
            } else if (data.event === "Checkout.Close") {
              console.log(data.eventData); // Data specifics on the event
            }
          },
        });
      }}
    />
  );
}

export default PaddleLoader;
