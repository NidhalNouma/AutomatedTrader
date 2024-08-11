import { useState } from "react";

function BarLine({ w1, w2, title1, title2 }) {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  return (
    w1 + w2 > 0 && (
      <div
        className={`rounded-md w-full flex items-center p-0.5 max-w-[8rem] ml-auto border ${
          w1 == 0 || w2 == 0
            ? w1 >= w2
              ? "border-green-400"
              : "border-red-400"
            : "border-none"
        } `}
      >
        <div
          style={{ width: `${w1}%` }}
          className={`${
            w1 != 0 &&
            w2 != 0 &&
            "p-0.5 pr-0 border-r-0 border-green-400 border rounded-md rounded-r-none"
          }`}
        >
          <div
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            className={`h-3 ${
              w2 > 0 ? "rounded-l" : "rounded"
            }   bg-green-400 relative cursor-pointer `}
          >
            {hover1 && (
              <div className="text-center absolute bottom-[120%] right-[70%] min-w-[6rem] bg-bga rounded p-2">
                <span className="text-xs text-text-p">
                  {Number(w1).toFixed(1)}% {title1}
                </span>
              </div>
            )}
          </div>
        </div>

        <div
          style={{ width: `${w2}%` }}
          className={`${
            w1 != 0 &&
            w2 != 0 &&
            "p-0.5 pl-0 border-l-0 border-red-400 border rounded-md rounded-l-none"
          }`}
        >
          <div
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
            className={`h-3 ${
              w1 > 0 ? "rounded-r" : "rounded"
            }   bg-red-400 relative cursor-pointer `}
          >
            {hover2 && (
              <div className="text-center absolute bottom-[120%] right-[70%] min-w-[6rem] bg-bga rounded p-2">
                <span className="text-xs text-text-p">
                  {Number(w2).toFixed(1)}% {title2}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default BarLine;
