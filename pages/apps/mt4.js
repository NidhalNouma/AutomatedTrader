import Sidenav from "../../Features/SideNav";
import Header from "../../Features/Header";
import { H1, H4 } from "../../Components/H";
import { ButtonText } from "../../Components/Button";
import { GetUserContext } from "../../hooks/UserHook";
import { GetMTAccountsContext, CalculateData } from "../../hooks/MTAccounts";

import Mt4 from "../../Features/MTAccount/Mt4";
import DataTable from "../../Features/MTAccount/DataTable";
import LineChart from "../../Features/MTAccount/LineChart";

import { MT4EAPath } from "../../utils/constant";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function help() {
  const { user } = GetUserContext();
  const { mtAccounts, getData } = GetMTAccountsContext();
  const data = getData();

  const { totalProfit, profitPerPair, profitPerWebhook } = CalculateData(data);
  console.log(totalProfit(), profitPerPair(), profitPerWebhook());
  return (
    <>
      <Sidenav cpath="mt4" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-10 py-8">
          <div className="flex justify-between">
            <H1>Metatrader 4</H1>
            <ButtonText
              onClick={(e) => {
                e.preventDefault();
                window.location = MT4EAPath;
              }}
            >
              download EA
            </ButtonText>
          </div>
          <div className="my-4">
            <span className="">Your Id: {user?.uid}</span>
          </div>
          <H4>Accounts</H4>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3">
            {mtAccounts.map((v, i) => (
              <Mt4 key={v.id} account={v} userId={user.uid} />
            ))}
          </div>

          {data?.length > 0 && (
            <div className="mt-12">
              <H4 className="mb-6">Metatrader 4 Trades</H4>

              <div className="my-4">
                <div className="flex">
                  <div className="w-2/3">
                    <LineChart />
                  </div>
                  <div className="w-1/3">
                    <App />
                  </div>
                </div>
              </div>

              <DataTable data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const data = {
  labels: ["US30", "EURUSD", "USDJPY", "BTCUSD", "GOLD", "GBPJPY"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      //   text: "Chart.js Line Chart",
    },
  },
};

export function App() {
  return <Doughnut data={data} options={options} />;
}
