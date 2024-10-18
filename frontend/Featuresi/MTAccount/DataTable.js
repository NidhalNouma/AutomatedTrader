import React, { useState } from "react";
import moment from "moment";
import { ButtonText } from "../../components/Button";
import { Badge } from "react-daisyui";

function DataTable({ data }) {
  const [show, setShow] = useState(false);

  return (
    <div className="overflow-x-auto w-full max-h-72 hideScrollbar">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-bgt sticky top-0">
            <th className="text-text-h text-xs pb-3">Date/Time</th>
            <th className="text-text-h text-xs">Pair</th>
            <th className="text-text-h text-xs">Open Price</th>
            <th className="text-text-h text-xs">Lot</th>
            <th className="text-text-h text-xs">Pips</th>
            <th className="text-text-h text-xs">Profit</th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.slice(0)
            .reverse()
            ?.map((v, i) => {
              return (i < 10 && !show) || show ? (
                <React.Fragment key={i}>
                  <tr className="border-spacing-[7px] border-b-[1px] border-gray-700">
                    <td className="text-xs text-center py-3">
                      {v.closeTimeGMT
                        ? moment.utc(v.closeTimeGMT).fromNow()
                        : moment(v.closeTime).fromNow()}
                    </td>
                    <td className="text-xs text-center">
                      {v.test && (
                        <Badge className="!h-2 !w-2 !p-0" color="info" />
                      )}{" "}
                      {v.symbol}
                    </td>
                    <td className="text-xs text-center">{v.open}</td>
                    <td className="text-xs text-center">{v.lot}</td>
                    <td className="text-xs text-center">{v.pips}</td>
                    <td className="text-xs text-center">
                      ${Number(v.profit).toFixed(2)}
                    </td>
                  </tr>
                  {/* <hr className="my-0 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              );
            })}
        </tbody>
      </table>
      {/* <div className="w-full text-center mt-4">
        <ButtonText className="" onClick={() => setShow(!show)}>
          {!show ? "Show all" : "Hide"}
        </ButtonText>
      </div> */}
    </div>
  );
}

export default DataTable;
