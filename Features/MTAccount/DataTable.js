import React from "react";
import { Table } from "react-daisyui";

function DataTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <Table zebra={true}>
        <Table.Head>
          <span />
          <span>Pair</span>
          <span>Type</span>
          <span>Lot</span>
          <span>Open price</span>
          <span>Close price</span>
          <span>Profit</span>
          <span>Open time</span>
          <span>Close time</span>
        </Table.Head>

        <Table.Body>
          {data
            ?.map((d, i) => {
              return (
                <Table.Row key={i}>
                  <span>{i + 1}</span>
                  <span>{d.symbol}</span>
                  <span>{d.type === "0" ? "Buy" : "Sell"}</span>
                  <span>{d.lot}</span>
                  <span>{d.open}</span>
                  <span>{d.close}</span>
                  <span>{d.profit}</span>
                  <span>{d.openTime}</span>
                  <span>{d.closeTime}</span>
                </Table.Row>
              );
            })
            .reverse()}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DataTable;
