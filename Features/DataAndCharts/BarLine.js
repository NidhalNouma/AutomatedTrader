import { useState } from "react";

function BarLine({ w1, w2, title1, title2 }) {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  return (
    w1 + w2 > 0 && (
      <div className="rounded-xl w-full flex items-center h-4 max-w-[8rem] ml-auto">
        <div
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
          className={`h-2 ${
            w2 > 0 ? "rounded-l-xl" : "rounded-xl"
          }   bg-green-400 relative cursor-pointer`}
          style={{ width: `${w1}%` }}
        >
          {hover1 && (
            <div className="text-center absolute bottom-[120%] bg-bga rounded-xl p-2">
              <span className="text-xs text-text-p">
                {Number(w1).toFixed(1)}% {title1}
              </span>
            </div>
          )}
        </div>
        <div
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
          className={`h-2 ${
            w1 > 0 ? "rounded-r-xl" : "rounded-xl"
          }   bg-red-400 relative cursor-pointer`}
          style={{ width: `${w2}%` }}
        >
          {hover2 && (
            <div className="text-center absolute bottom-[120%] bg-bga rounded-xl p-2">
              <span className="text-xs text-text-p">
                {Number(w2).toFixed(1)}% {title2}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default BarLine;
