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
        });
      }}
    />
  );
}

export default PaddleLoader;
