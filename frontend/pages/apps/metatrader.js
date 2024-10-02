import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { withAuth } from "../../contexts/UserContext";

import { MainLayoutWithHeader } from "../../components/layout/MainLayout";
import { Button, RoundedButton, ButtonText } from "../../components/ui/Button";
import {
  Label,
  Label2,
  SubTitle,
  SubTitle2,
  SubTitle3,
} from "../../components/ui/Text";
import { SelectFull } from "../../components/ui/Input";
import { ModalWithHeader, UpgradeModal } from "../../components/ui/Modal";
import NewAccountForm from "../../components/Forms/Metatrader";
import AccountLayout from "../../components/layout/AccountLayout";

import MTStatus from "../../components/parts/MTStatus";
import TradesTable from "../../components/parts/TradesTable";
import { ButtonGroup } from "react-daisyui";

import { useMetatrader } from "../../contexts/MetatraderContext";
import { processTrades, AccountData } from "../../hooksp/MetatraderHook";
import { useUser } from "../../contexts/UserContext";

import LineChart from "../../components/charts/Line";
import LineAndBarChart from "../../components/charts/LineAndBar";
import HalfDoughnutChart from "../../components/charts/HalfDoughnut";
import DoughnutChart from "../../components/charts/Doughnut";

import { RectangleSkeleton } from "../../components/ui/Skeleton";

import { PlusIcon } from "@heroicons/react/outline";

const calculateSumOfData = (datasets) => {
  return datasets?.reduce((totalSum, dataset) => {
    const datasetSum = dataset.data.reduce((sum, value) => sum + value, 0);
    return totalSum + datasetSum;
  }, 0);
};

function Metatrader() {
  const { mtAccounts, mtAccountsData } = useMetatrader();
  const { fullUser } = useUser();

  const {
    lineData,
    lineDataType,
    setLineDataType,
    lineDataPeriod,
    setLineDataPeriod,
    lineDataPeriodOption,

    lineBarData,
    lineBarAccount,
    setLineBarAccount,
    lineBarDataPeriod,
    setLineBarDataPeriod,
    lineBarDataValues,

    halfDoughnutData,

    trades,
    doughnutData,
  } = AccountData();

  const sumLineData = calculateSumOfData(lineData);

  // const { fullUser } = GetFullUserContext();
  // const sub = fullUser?.subObj;

  const [openNewAccount, setOpenNewAccount] = useState(false);

  const [openUpg, setOpenUpg] = useState(false);
  const [openWaitingList, setOpenWaitingList] = useState(false);

  return (
    <Fragment>
      <MainLayoutWithHeader
        page="metatrader"
        title="Metatrader"
        rightSection={
          fullUser?.hasAccessTo?.metatrader &&
          fullUser?.hasAccessTo?.metatrader > mtAccounts?.length ? (
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
        {mtAccounts?.length > 0 ? (
          <Fragment>
            <AccountLayout
              className="mt-4"
              sectionL1={mtAccounts.map((account, i) => {
                // console.log(mtAccountsData);
                const data = mtAccountsData?.find(
                  (v) => v.account.id === account.id
                );
                return (
                  <MTStatus
                    key={account.id}
                    account={account}
                    accountData={data}
                  />
                );
              })}
              sectionR1={
                lineData?.length > 0 && (
                  <Fragment>
                    <div className="w-full flex justify-between items-end">
                      <div className="">
                        <SubTitle2 className="">Overall</SubTitle2>
                        <SubTitle
                          className={
                            sumLineData > 0
                              ? "!text-profit"
                              : sumLineData < 0
                              ? "!text-loss"
                              : ""
                          }
                        >
                          ${Number(sumLineData).toFixed(2)}
                        </SubTitle>
                      </div>

                      <div className="flex items-center">
                        <ButtonGroup>
                          <ButtonText
                            className={`font-semibold ${
                              lineDataType === 0
                                ? "text-primary hover:!bg-transparent"
                                : "text-text/80"
                            }`}
                            onClick={() => setLineDataType(0)}
                          >
                            Total
                          </ButtonText>
                          <ButtonText
                            className={`font-semibold ${
                              lineDataType === 1
                                ? "text-primary hover:!bg-transparent"
                                : "text-text/80"
                            }`}
                            onClick={() => setLineDataType(1)}
                          >
                            Profit
                          </ButtonText>
                          <ButtonText
                            className={`font-semibold ${
                              lineDataType === 2
                                ? "text-primary hover:!bg-transparent"
                                : "text-text/80"
                            }`}
                            onClick={() => setLineDataType(2)}
                          >
                            Loss
                          </ButtonText>
                        </ButtonGroup>
                        <SelectFull
                          options={lineDataPeriodOption}
                          value={lineDataPeriod}
                          setValue={setLineDataPeriod}
                          className="w-28 "
                          selectClassName="!outline-bg opacity-60"
                        />
                      </div>
                    </div>
                    <div className="h-96">
                      <LineChart data={lineData} className="" />
                    </div>
                  </Fragment>
                )
              }
              sectionL2={
                trades?.length > 0 &&
                lineBarData && (
                  <Fragment>
                    <div className="w-full flex justify-between items-end">
                      <div className="w-full">
                        <div className="flex items-center w-full justify-between">
                          <SubTitle3 className="flex items-center">
                            Gain{" "}
                            <SelectFull
                              options={mtAccounts.map((account) => {
                                return {
                                  label: account.accountDisplayName,
                                  value: account,
                                };
                              })}
                              value={lineBarAccount}
                              setValue={setLineBarAccount}
                              className="w-28 ml-1"
                              selectClassName="!outline-bg opacity-80"
                            />
                          </SubTitle3>

                          <SelectFull
                            options={lineDataPeriodOption}
                            value={lineBarDataPeriod}
                            setValue={setLineBarDataPeriod}
                            className="w-28 "
                            selectClassName="!outline-none !outline-bg opacity-60"
                          />
                        </div>
                        <div className="w-full flex items-center justify-between mt-0">
                          <SubTitle
                            className={
                              lineBarDataValues.all > 0
                                ? "!text-profit"
                                : lineBarDataValues.all < 0
                                ? "!text-loss"
                                : ""
                            }
                          >
                            {Number(lineBarDataValues.all).toFixed(1)} %
                          </SubTitle>
                          <div className="flex items-center">
                            <div className="flex flex-col items-center mr-2.5">
                              <Label2 className="!text-text/60">Today</Label2>
                              <Label
                                className={`!font-semibold ${
                                  lineBarDataValues.today > 0
                                    ? "!text-profit"
                                    : lineBarDataValues.today < 0
                                    ? "!text-loss"
                                    : "!text-text/80"
                                } text-xs`}
                              >
                                {Number(lineBarDataValues.today).toFixed(2)}%
                              </Label>
                            </div>
                            <div className="flex flex-col items-center mr-2.5">
                              <Label2 className="!text-text/60">Week</Label2>
                              <Label
                                className={`!font-semibold ${
                                  lineBarDataValues.week > 0
                                    ? "!text-profit"
                                    : lineBarDataValues.week < 0
                                    ? "!text-loss"
                                    : "!text-text/80"
                                } text-xs`}
                              >
                                {Number(lineBarDataValues.week).toFixed(2)}%
                              </Label>
                            </div>
                            <div className="flex flex-col items-center mr-2.5">
                              <Label2 className="!text-text/60">Month</Label2>
                              <Label
                                className={`!font-semibold ${
                                  lineBarDataValues.month > 0
                                    ? "!text-profit"
                                    : lineBarDataValues.month < 0
                                    ? "!text-loss"
                                    : "!text-text/80"
                                } text-xs`}
                              >
                                {Number(lineBarDataValues.month).toFixed(2)}%
                              </Label>
                            </div>
                            <div className="flex flex-col items-center ">
                              <Label2 className="!text-text/60">Year</Label2>
                              <Label
                                className={`!font-semibold ${
                                  lineBarDataValues.year > 0
                                    ? "!text-profit"
                                    : lineBarDataValues.year < 0
                                    ? "!text-loss"
                                    : "!text-text/80"
                                } text-xs`}
                              >
                                {Number(lineBarDataValues.year).toFixed(2)}%
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-60">
                      <LineAndBarChart data={lineBarData} />
                    </div>
                  </Fragment>
                )
              }
              sectionL3={
                <Fragment>
                  {trades?.length > 0 && halfDoughnutData && (
                    <Fragment>
                      <div className="w-full mt-4 ">
                        <SubTitle3 className="flex items-center">
                          Profitability
                        </SubTitle3>
                      </div>
                      <HalfDoughnutChart
                        className="px-6 "
                        labels={["loss", "profit"]}
                        data={[
                          halfDoughnutData.lossPercentage,
                          halfDoughnutData.profitPercentage,
                        ]}
                        colors={[
                          `hsl(${getComputedStyle(
                            document.documentElement
                          ).getPropertyValue("--loss-color")})`,
                          `hsl(${getComputedStyle(
                            document.documentElement
                          ).getPropertyValue("--profit-color")})`,
                        ]}
                      >
                        <div className=" aspect-square rounded-full flex flex-col items-center justify-center">
                          <div className="text-lg font-bold text-text">
                            Win rate
                          </div>
                          <span className="text-xl font-semibold text-profit">
                            {Number(halfDoughnutData.profitPercentage).toFixed(
                              2
                            )}{" "}
                            %
                          </span>
                        </div>
                      </HalfDoughnutChart>
                    </Fragment>
                  )}
                </Fragment>
              }
              sectionR2={
                trades?.length > 0 &&
                doughnutData && (
                  <Fragment>
                    <div className="w-full mt-4">
                      <SubTitle2 className="flex items-center">
                        Last transaction
                      </SubTitle2>
                    </div>
                    <div className="w-full mt-4 flex items-start justify-between">
                      <div className="grow">
                        <TradesTable data={trades.slice(0, 10)} />
                        {trades.length > 0 && (
                          <Link href="/trades">
                            <h6 className=" text-text/60 hover:underline cursor-pointer text-center font-semibold text-xs mt-3">
                              View all
                            </h6>
                          </Link>
                        )}
                      </div>
                      <div className="w-4/12 hidden sm:flex flex-col items-center">
                        <DoughnutChart
                          className="px-6 "
                          labels={doughnutData.labels}
                          data={doughnutData.data}
                          colors={doughnutData.colors}
                        >
                          <div className=" bg-bgt w-3/4 aspect-square rounded-full flex flex-col items-center justify-center">
                            <div className="text-sm text-text">
                              Total trades
                            </div>
                            <span className="text-xl font-semibold text-title">
                              {trades.length || 0}
                            </span>
                          </div>
                        </DoughnutChart>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {doughnutData.data?.map((pair, i) => (
                            <div
                              key={i}
                              className="text-text text-xs font-semibold flex items-center"
                            >
                              <div
                                className="h-2 aspect-square rounded-full mr-1"
                                style={{
                                  backgroundColor: doughnutData.colors[i],
                                }}
                              ></div>{" "}
                              {doughnutData.labels[i]}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )
              }
            />
          </Fragment>
        ) : mtAccounts == null ? (
          <Fragment>
            <AccountLayout
              className="mt-4"
              sectionL1={
                <Fragment>
                  <RectangleSkeleton className="!h-20" />
                  <RectangleSkeleton className="!h-20 mt-2" />
                  <RectangleSkeleton className=" mt-4" />
                  <RectangleSkeleton className=" mt-4" />
                </Fragment>
              }
              sectionR1={
                <Fragment>
                  <RectangleSkeleton className="!h-64" />
                  <RectangleSkeleton className="!h-64 mt-4" />
                  <RectangleSkeleton className=" mt-4" />
                </Fragment>
              }
            />
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
      </MainLayoutWithHeader>
    </Fragment>
  );
}

export default withAuth(Metatrader);
