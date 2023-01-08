import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Title from "../../Features/WebhookData/Title";
import LineChart from "../../Features/WebhookData/LineChart";

import Header from "../../Features/Header";
import Sidenav from "../../Features/SideNav";

import { H3 } from "../../Components/H";
import DataTable from "../../Features/WebhookData/DataTable";

import DoughChart from "../../Features/MTAccount/DoughChart";

import { WebhookWithData } from "../../hooks/WebhookAccounts";

import { getDataByWebhook, CalculateData } from "../../hooks/MTAccounts";

function Webhook({}) {
  const router = useRouter();
  const { id } = router.query;
  const { webData } = WebhookWithData(id);

  const [data, setData] = useState([]);
  const [pairProfit, setPairProfit] = useState([]);
  const [tp, setTp] = useState(null);

  useEffect(() => {
    if (webData) {
      const idata = getDataByWebhook(webData.mtAccounts, webData.webhook.id);
      setData(idata);

      const { totalProfit, profitPerPair } = CalculateData(idata);
      setPairProfit(profitPerPair());
      setTp(totalProfit());

      console.log(profitPerPair());
    }
  }, [webData]);

  return (
    <Fragment>
      <Sidenav />
      <div className="w-full flex flex-col">
        <Header />
        {webData && (
          <Fragment>
            <div className="">
              <div className="flex flex-col items-start justify-center mx-8 mb-8 pt-8 sticky top-16 bg-bg">
                <Title webhook={webData.webhook} user={webData.user} />
              </div>
              <div className=" m-8">
                <div className="w-7/12">
                  <LineChart
                    webhook={webData.webhook}
                    mtAccounts={webData.mtAccounts}
                  />
                </div>

                <div className="flex w-full bg-bg p-2 rounded-xl mt-6">
                  <div className="w-3/5">
                    <H3 className="m-2">Last transaction</H3>
                    <div className="px-3">
                      <DataTable data={data} />
                    </div>
                  </div>
                  {Object.keys(pairProfit).length > 0 && (
                    <div className="w-2/5 mt-8">
                      <DoughChart adata={pairProfit} total={tp} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default Webhook;
