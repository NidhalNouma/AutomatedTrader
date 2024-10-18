import React, { useState } from "react";
import moment from "moment";
import { ButtonText } from "../../components/Button";

function DataTable({ data }) {
  const [show, setShow] = useState(false);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-text-h text-sm">Date/Time</th>
            <th className="text-text-h text-sm">Pair</th>
            <th className="text-text-h text-sm">Open Price</th>
            <th className="text-text-h text-sm">Close Price</th>
            <th className="text-text-h text-sm">Pips</th>
            {/* <th className="text-text-h text-sm">Profit</th> */}
          </tr>
        </thead>
        <tbody>
          {data
            ?.slice(0)
            .reverse()
            .map((v, i) =>
              (i < 6 && !show) || show ? (
                <React.Fragment key={i}>
                  <tr className="border-spacing-[7px] border-b-[1px] border-gray-700">
                    <td className="text-xs text-center py-3">
                      {v.closeTimeGMT
                        ? moment.utc(v.closeTimeGMT).fromNow()
                        : moment(v.closeTime).fromNow()}
                    </td>
                    <td className="text-xs text-center">{v.symbol}</td>
                    <td className="text-xs text-center">{v.open}</td>
                    <td className="text-xs text-center">{v.close}</td>
                    <td className="text-xs text-center">{v.pips}</td>
                    {/* <td className="text-xs text-center">
                      ${Number(v.profit).toFixed(2)}
                    </td> */}
                  </tr>
                  {/* <hr className="my-0 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )
            )}
        </tbody>
      </table>
      {data?.length >= 6 && (
        <div className="w-full text-center mt-4">
          <ButtonText className="" onClick={() => setShow(!show)}>
            {!show ? "Show all" : "Hide"}
          </ButtonText>
        </div>
      )}
    </div>
  );
}

export default DataTable;
