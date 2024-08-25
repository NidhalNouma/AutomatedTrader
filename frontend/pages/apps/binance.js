import { Fragment, useState, useEffect } from "react";
import { withAuth } from "../../contexts/UserContext";
import { Button } from "../../components/ui/Button";
import { SubTitle2 } from "../../components/ui/Text";
import { MainLayoutWithHeader } from "../../components/layout/MainLayout";
import { ModalWithHeader, UpgradeModal } from "../../components/ui/Modal";
import NewAccountForm from "../../components/Forms/Binance";
import AccountLayout from "../../components/layout/AccountLayout";

import { useBinance } from "../../contexts/BinanceContext";
import { useUser } from "../../contexts/UserContext";

import { PlusIcon } from "@heroicons/react/outline";
import BinanceStatus from "../../components/parts/BinanceStatus";

import DoughnutChart from "../../components/charts/Doughnut";

function Binance() {
  const [openNewAccount, setOpenNewAccount] = useState(false);
  const { binanceAccountsData } = useBinance();
  const { fullUser } = useUser();

  const mergeBalances = (binanceAccountsData) => {
    const mergedBalances = {};

    binanceAccountsData.forEach((account) => {
      ["spot", "usdm", "coinm"].forEach((type) => {
        if (account[type] && account[type].balances) {
          account[type].balances.forEach((balance) => {
            if (balance.balance > 0) {
              if (!mergedBalances[balance.asset]) {
                mergedBalances[balance.asset] = {
                  asset: balance.asset,
                  balance: 0,
                  usdtPrice: 0,
                  image: balance.image,
                };
              }
              mergedBalances[balance.asset].balance += balance.balance;
              if (mergedBalances[balance.asset].asset === "USDT") {
                mergedBalances[balance.asset].usdtPrice += balance.balance;
              } else if (balance.usdtPrice) {
                mergedBalances[balance.asset].usdtPrice += balance.usdtPrice;
              }
            }
          });
        }
      });
    });

    // Filter out assets with a balance of 0
    return Object.values(mergedBalances)
      .filter((balance) => balance.balance > 0)
      .sort((balance1, balance2) => balance2.usdtPrice - balance1.usdtPrice);
  };

  const assets = mergeBalances(binanceAccountsData);
  const doughnutColors = [
    "#3d74a8",
    "#6ca834",
    "#a89a34",
    "#de6259",
    "#797fdb",
    "#b779db",
    "#db79bc",
  ];

  return (
    <Fragment>
      <MainLayoutWithHeader
        page="binance"
        title="Binance"
        rightSection={
          fullUser?.hasAccessTo?.binance &&
          fullUser?.hasAccessTo?.binance > binanceAccountsData?.length ? (
            <ModalWithHeader
              close={openNewAccount}
              title="New Account"
              trigger={
                <Button
                  className=" !bg-secondary !outline-secondary"
                  icon={<PlusIcon className="h-3.5 aspect-square" />}
                >
                  Account
                </Button>
              }
            >
              <NewAccountForm
                close={() => setOpenNewAccount(!openNewAccount)}
              ></NewAccountForm>
            </ModalWithHeader>
          ) : (
            <UpgradeModal
              trigger={
                <Button
                  className=" !bg-secondary !outline-secondary"
                  icon={<PlusIcon className="h-3.5 aspect-square" />}
                >
                  Account
                </Button>
              }
            ></UpgradeModal>
          )
        }
      >
        {binanceAccountsData?.length > 0 ? (
          <AccountLayout
            className="mt-4"
            sectionL1={binanceAccountsData.map((account, i) => (
              <BinanceStatus
                key={i}
                accountData={account}
                account={account.account}
              />
            ))}
            sectionR1={
              <div className="rounded-lg px-3 pb-3 border border-text/10 max-h-[80vh] overflow-y-scroll hideScrollbar">
                <div className="w-full flex justify-between items-end py-2 sticky top-0 bg-bgt">
                  <SubTitle2 className="">My Assets</SubTitle2>
                </div>

                <div className="">
                  <div className="overflow-x-auto">
                    <table className="min-w-full ">
                      <tbody>
                        {assets.map((asset, i) => (
                          <tr
                            key={`${i}`}
                            className=" py-3 hover:bg-text/10 rounded-lg px-1"
                          >
                            <td className="py-2 px-4 flex items-center">
                              <img
                                src={asset.image}
                                alt={asset.asset}
                                width="20"
                                height="20"
                                onError={(e) =>
                                  (e.target.src =
                                    "/icons/crypto/color/generic.svg")
                                }
                              />
                              <span className="text-lg font-bold ml-1 text-text">
                                {asset.asset}
                              </span>
                            </td>
                            <td className="py-2 px-4">
                              <div className="flex flex-col">
                                <span className="text-text/60 text-xs">
                                  Amount
                                </span>
                                <span className="text-text/80 text-md">
                                  {asset.balance}
                                </span>
                              </div>
                            </td>
                            <td className="py-2 px-4">
                              <div className="flex flex-col">
                                <span className="text-text/60 text-xs">
                                  Cost price
                                </span>
                                <span className="text-text/80 text-md">
                                  $
                                  {Number(
                                    asset.asset === "USDT"
                                      ? asset.balance
                                      : asset.usdtPrice
                                  ).toFixed(8)}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            }
            sectionL2={
              <Fragment>
                <div className="aspect-square mx-auto max-h-40 ">
                  <DoughnutChart
                    className=""
                    labels={assets.map((asset) => asset.asset)}
                    data={assets.map((asset) => asset.usdtPrice)}
                    colors={doughnutColors}
                  >
                    <div className=" bg-bgt w-12/12 aspect-square rounded-full flex flex-col items-center justify-center">
                      <div className="text-sm text-text">Total assets</div>
                      <span className="text-xl font-semibold text-title">
                        {assets.length || 0}
                      </span>
                    </div>
                  </DoughnutChart>
                </div>

                <div className="w-full flex justify-center">
                  <div className="grid grid-cols-3 gap-6 mt-4 mx-auto">
                    {assets?.splice(0, 6).map((asset, i) => (
                      <div
                        key={i}
                        className="text-text text-xs font-semibold flex items-center"
                      >
                        <div
                          className="h-2 aspect-square rounded-full mr-1"
                          style={{
                            backgroundColor: doughnutColors[i],
                          }}
                        ></div>{" "}
                        {asset.asset}
                      </div>
                    ))}
                  </div>
                </div>
              </Fragment>
            }
          />
        ) : (
          <Fragment></Fragment>
        )}
      </MainLayoutWithHeader>
    </Fragment>
  );
}

export default withAuth(Binance);
