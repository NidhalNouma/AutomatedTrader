import { Fragment, useState } from "react";
import { Button as Button_, ButtonGroup } from "react-daisyui";
import { SubTitle3, Label, Label2, Par } from "../ui/Text";
import { Select } from "../ui/Input";
import { Button } from "../ui/Button";
import { Error } from "../ui/Alerts";
import { IoIosArrowBack } from "react-icons/io";

import moment from "moment";

import { addAlpha } from "../../utils/functions";
import { OpenTrade as OpenTradeHook } from "../../hooksp/TradeHook";

function OpenTrade({ close, children }) {
  const {
    app,
    setApp,
    account,
    setAccount,
    accountOptions,

    presetsActions,
    selectedPreset,
    setSelectedPreset,

    error,
    sendTrade,
  } = OpenTradeHook();

  return account ? (
    <Fragment>
      <MetaTraderTrade
        account={account}
        back={() => setAccount(null)}
        presetsActions={presetsActions}
        selectedPreset={selectedPreset}
        setSelectedPreset={setSelectedPreset}
        error={error}
        sendTrade={sendTrade}
      />
    </Fragment>
  ) : (
    <section className="w-full flex flex-col items-center">
      <Apps app={app} setApp={setApp} />
      {app && (
        <Fragment>
          <br />
          <br />
          <Accounts accounts={accountOptions} setAccount={setAccount} />
        </Fragment>
      )}
    </section>
  );
}

export default OpenTrade;

function Apps({ app, setApp }) {
  return (
    <Fragment>
      <SubTitle3 className="mb-2 !text-title/80 !text-base">
        Choose an app
      </SubTitle3>
      <section className="w-full grid grid-cols-3 gap-4">
        <div
          onClick={() => setApp("metatrader")}
          className={`${
            app == "metatrader" && "bg-text/10"
          } px-2 py-2.5 outline-text/20 outline-1 outline-dashed rounded-lg flex items-start justify-center cursor-pointer hover:bg-text/10 transition-all`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 aspect-square fill-text mr-1.5"
            viewBox="0 0 410 401"
            fill="none"
          >
            <path d="M195.894 214.079C199.28 213.707 201.592 213.418 204.151 213.212C220.954 211.849 233.793 220.024 236.518 233.854C240.399 253.34 232.39 269.647 215.133 273.652C205.146 275.281 195.001 275.711 184.913 274.932C176.16 274.932 172.073 269.936 173.766 260.895C173.931 259.138 173.931 257.368 173.766 255.611C182.186 257.464 190.704 258.843 199.28 259.739C211.335 260.4 217.651 253.505 216.66 242.358C215.959 234.556 210.922 230.303 201.096 229.313C198.996 229.106 196.88 229.106 194.78 229.313C176.284 231.047 176.202 231.047 176.986 212.799C177.44 203.221 177.894 193.602 179.092 183.9C179.381 181.588 182.477 177.914 184.376 177.831C199.569 177.336 214.803 177.583 230.532 177.583V194.097H197.504L195.894 214.079Z" />
            <path d="M117.236 400.002C97.9928 396.243 80.179 387.193 65.7955 373.869C62.863 371.594 59.7572 369.551 56.5065 367.759C62.7818 364.085 66.3322 362.144 69.7588 360.039C85.4056 350.667 97.7908 338.901 101.919 320.488C109.681 287.75 83.3001 260.791 49.4882 267.644C39.3987 270.39 29.586 274.066 20.1764 278.626C16.6867 280.338 13.3085 282.269 10.0617 284.406C3.82778 257.901 4.03421 232.966 16.7911 210.094C44.2038 160.553 91.1028 142.842 142.626 132.604L144.153 134.709C138.536 139.283 133.315 144.324 128.548 149.778C119.052 162.163 110.548 175.663 101.465 188.585C99.3797 192.044 96.7442 195.139 93.6624 197.75C84.3322 204.686 74.9194 211.415 68.0662 223.388L93.6624 217.278C93.6624 221.778 93.6624 225.204 93.6624 228.631C93.6624 263.186 107.204 291.342 132.8 314.254C138.787 320.233 144.398 326.575 149.603 333.245L140.603 340.8C154.392 337.085 158.561 348.686 165.827 355.539C174.704 363.796 184.24 371.681 193.859 380.02C179.492 391.332 161.658 395.296 144.318 400.002H117.236Z" />
            <path d="M409.137 331.555C399.931 355.418 383.21 364.583 358.233 358.968C336.6 353.89 321.078 341.257 314.926 319.129C308.775 297 323.183 278.092 345.435 275.202C359.545 273.557 373.772 277.079 385.484 285.117C397.196 293.156 405.599 305.165 409.137 318.922V331.555Z" />
            <path d="M212.726 0C246.414 10.8578 255.042 57.0962 233.616 84.22C218.382 103.5 194.107 104.036 177.552 85.9126C156.909 63.165 159.428 13.4174 196.501 0H212.726Z" />
            <path d="M0.123848 318.919C12.0137 287.543 34.3073 272.103 62.9173 275.364C68.3982 275.754 73.7082 277.439 78.4109 280.281C83.1135 283.123 87.0746 287.041 89.9683 291.712C92.862 296.383 94.6057 301.674 95.0562 307.15C95.5066 312.626 94.6509 318.131 92.5594 323.212C87.7007 335.577 78.6908 345.866 67.0754 352.314C55.4599 358.762 41.9627 360.968 28.899 358.552C13.211 355.125 4.12843 344.763 0 329.653L0.123848 318.919Z" />
            <path d="M275.666 116.917L269.598 136.733C252.299 131.243 236.116 125.339 219.52 121.128C202.923 116.917 186.864 121.128 170.68 124.802C160.566 127.073 150.038 127.733 139.18 129.22L137.736 117.825C134.226 131.532 122.667 129.963 112.965 132.481C101.158 135.536 89.7219 140.201 78.121 144.165C62.4742 104.243 106.731 41.2428 156.313 34.2658C157.222 44.2153 157.552 54.2887 159.162 64.1557C160.21 71.3123 162.784 78.1603 166.708 84.236C170.633 90.3116 175.817 95.4732 181.91 99.3712C201.024 112.045 222.286 108.701 237.189 90.8253C247.758 78.1923 250.937 63.1235 251.721 47.2704C251.721 42.7704 251.721 38.3117 251.721 32.7383C254.329 33.2385 256.907 33.8863 259.442 34.6786C304.359 51.1924 327.272 84.2198 331.854 130.747C334.676 158.652 331.104 186.832 321.409 213.151C320.46 215.669 319.345 218.146 318.189 220.582C317.497 221.528 316.709 222.4 315.836 223.183C315.077 216.249 313.597 209.414 311.419 202.788C305.019 188.421 297.299 174.632 290.405 160.431C287.98 155.551 286.071 150.431 284.708 145.155C282.396 135.701 280.579 126.123 278.887 116.587L275.666 116.917Z" />
            <path d="M398.511 282.47C387.038 277.157 375.249 272.552 363.213 268.681C343.892 263.561 327.13 269.961 313.672 284.493C304.548 294.277 303.722 315.249 311.401 330.442C318.048 342.658 328.084 352.694 340.3 359.341C344.14 361.653 348.02 363.8 352.685 366.566C327.461 389.85 299.305 402.401 265.493 397.735C221.649 391.708 188.085 367.639 159.723 334.901C158.837 333.692 158.037 332.423 157.328 331.103C167.66 334.255 178.199 336.683 188.869 338.369C201.255 339.483 213.64 338.121 226.355 338.162C231.218 338.138 236.067 338.678 240.805 339.772C249.062 341.795 257.319 344.52 265.576 346.997L266.649 344.479L252.777 329.947C256.328 327.676 258.97 325.818 261.695 324.208C275.039 316.068 286.522 305.212 295.399 292.346C304.275 279.479 310.346 264.89 313.218 249.525C315.323 239.823 320.566 230.782 324.53 220.956L335.222 225.084C324.199 215.589 332.621 206.218 334.851 196.722C337.658 184.626 339.681 172.364 342.034 160.186C387.158 178.062 418.74 231.979 398.511 282.47Z" />
            <path d="M203.878 328.255C184.327 328.051 165.273 322.068 149.115 311.057C132.958 300.047 120.419 284.502 113.077 266.38C105.736 248.258 103.921 228.369 107.86 209.218C111.798 190.066 121.316 172.508 135.213 158.754C149.11 145 166.766 135.666 185.957 131.925C205.148 128.185 225.017 130.207 243.062 137.735C261.107 145.264 276.521 157.963 287.363 174.234C298.206 190.505 303.992 209.62 303.993 229.173C303.955 242.261 301.332 255.212 296.275 267.284C291.218 279.356 283.826 290.309 274.523 299.516C265.22 308.722 254.191 316.001 242.068 320.933C229.944 325.865 216.966 328.353 203.878 328.255ZM126.181 228.553C126.018 244.079 130.466 259.303 138.962 272.298C147.457 285.294 159.619 295.476 173.905 301.555C188.191 307.634 203.961 309.337 219.215 306.447C234.47 303.558 248.524 296.206 259.598 285.323C270.672 274.441 278.267 260.516 281.421 245.314C284.576 230.112 283.148 214.316 277.318 199.926C271.489 185.535 261.52 173.199 248.674 164.479C235.829 155.758 220.684 151.046 205.158 150.939C184.404 150.796 164.439 158.884 149.636 173.431C134.833 187.979 126.399 207.8 126.181 228.553Z" />
          </svg>
          <Label className="">Metatrader</Label>
        </div>
        <div
          onClick={() => setApp("binance")}
          className={`${
            app == "binance" && "bg-text/10"
          } px-2 py-2.5 outline-text/20 outline-1 outline-dashed rounded-lg flex items-start justify-center cursor-pointer hover:bg-text/10 transition-all`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 126.61 126.61"
            className="h-4 aspect-square  mr-1.5"
          >
            <g className="fill-text">
              <path d="m38.73 53.2 24.59-24.58 24.6 24.6 14.3-14.31-38.9-38.91-38.9 38.9z" />
              <path d="m0 63.31 14.3-14.31 14.31 14.31-14.31 14.3z" />
              <path d="m38.73 73.41 24.59 24.59 24.6-24.6 14.31 14.29-38.9 38.91-38.91-38.88z" />
              <path d="m98 63.31 14.3-14.31 14.31 14.3-14.31 14.32z" />
              <path d="m77.83 63.3-14.51-14.52-10.73 10.73-1.24 1.23-2.54 2.54 14.51 14.5 14.51-14.47z" />
            </g>
          </svg>
          <Label className="">Binance</Label>
        </div>
        <div
          onClick={() => setApp("bitget")}
          className={`${
            app == "bitget" && "bg-text/10"
          } px-2 py-2.5 outline-text/20 outline-1 outline-dashed rounded-lg flex items-start justify-center cursor-pointer hover:bg-text/10 transition-all`}
        >
          <svg
            className="h-4 aspect-square fill-text mr-1.5"
            viewBox="0 0 172 185"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M89.8513 118.534C77.4117 118.534 65.4091 118.688 53.4169 118.403C51.0751 118.348 48.2172 117.162 46.5411 115.528C32.2194 101.573 18.0999 87.409 3.95435 73.2732C-1.28184 68.0406 -1.31962 64.4215 3.85146 59.2115C22.6339 40.2879 41.4364 21.384 60.3071 2.54865C61.4868 1.37114 63.3072 0.142902 64.8443 0.123698C79.4692 -0.0590158 94.0974 0.0147008 108.055 0.0147008C86.8496 22.0068 65.4345 44.217 43.2666 67.2078C60.0575 83.3148 77.3013 99.8562 94.545 116.398C94.1595 116.939 93.7741 117.48 93.3886 118.021C92.3564 118.192 91.3242 118.363 89.8513 118.534Z" />
            <path d="M93.4049 66.401C102.068 66.4008 110.241 66.1865 118.39 66.534C120.746 66.6344 123.588 67.7789 125.264 69.4124C139.581 83.3658 153.696 97.5269 167.839 111.659C173.11 116.928 173.144 120.488 167.957 125.712C149.175 144.628 130.385 163.535 111.503 182.35C110.236 183.612 108.188 184.788 106.488 184.811C92.0246 185.004 77.5575 184.921 63.5394 184.921C84.8885 162.915 106.36 140.782 128.553 117.904C111.681 101.769 94.4152 85.2575 77.1496 68.7463C77.577 67.9645 78.0045 67.1827 78.4319 66.4008C83.2566 66.4008 88.0814 66.4008 93.4049 66.401Z" />
          </svg>
          <Label className="">Bitget</Label>
        </div>
      </section>
    </Fragment>
  );
}

function Accounts({ accounts, setAccount }) {
  return (
    <Fragment>
      <SubTitle3 className="mb-2 !text-title/80 !text-base">
        Choose an account
      </SubTitle3>
      {accounts?.length > 0 ? (
        <section className="w-full grid grid-cols-3 gap-4">
          {accounts.map((account, i) => (
            <div
              key={i}
              onClick={() => setAccount(account)}
              className="relative px-2 py-2.5  rounded-lg flex items-start justify-center cursor-pointer "
            >
              <div
                style={{
                  backgroundColor: addAlpha(account.color, 0.1),
                  outlineColor: account.color,
                }}
                className="absolute inset-0 rounded-lg outline-1 outline-dashed opacity-30 hover:opacity-60 transition-all"
              />

              <Label className="">{account.name}</Label>
            </div>
          ))}
        </section>
      ) : (
        <section className="w-full ">
          <Par className="text-center text-sm mt-2">
            No account available yet!
          </Par>
        </section>
      )}
    </Fragment>
  );
}

function MetaTraderTrade({
  account,
  back,
  presetsActions,
  selectedPreset,
  setSelectedPreset,
  error,
  sendTrade,
}) {
  function TradesTable({ data }) {
    return (
      <div className="overflow-x-auto w-full max-h-72 hideScrollbar">
        <table className="table-auto w-full mt-1.5">
          <thead className="">
            <tr className="bg-bg/20 backdrop-blur-xl text-text/60 font-extralight sticky top-0 text-xs ">
              <th className=" py-1">Type</th>
              <th className="">Pair</th>
              <th className="">Open Price</th>
              <th className="">Lot</th>
              <th className="">SL</th>
              <th className="">TP</th>
              <th className="">Profit</th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.slice(0)
              .reverse()
              ?.map((v, i) => {
                return (
                  <Fragment key={i}>
                    <tr className="border-spacing-[7px] text-text">
                      <td className={"text-xs text-center py-1 "}>
                        <span
                          className={`px-2 py-[0.1rem] rounded font-semibold ${
                            v?.type?.search("BUY") >= 0
                              ? "text-long bg-long/10"
                              : v.type?.search("SELL") >= 0
                              ? "text-short bg-short/10"
                              : ""
                          }
                          `}
                        >
                          {v.type === "POSITION_TYPE_BUY" ? "BUY" : "SELL"}
                        </span>
                      </td>
                      <td className="text-xs text-center">{v.symbol}</td>
                      <td className="text-xs text-center">{v.openPrice}</td>
                      <td className="text-xs text-center">{v.volume}</td>
                      <td className="text-xs text-center">
                        {v.stopLoss || "NA"}
                      </td>
                      <td className="text-xs text-center">
                        {v.takeProfit || "NA"}
                      </td>
                      <td
                        className={`text-sm text-center ${
                          v.profit > 0
                            ? "text-profit"
                            : v.profit < 0
                            ? "text-loss"
                            : ""
                        } `}
                      >
                        ${Number(v.profit).toFixed(2)}
                      </td>
                    </tr>
                    {/* <hr className="my-0 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
                  </Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }

  // console.log(account);
  return (
    <Fragment>
      <section className="-mt-2">
        <Label className="flex items-center">
          <IoIosArrowBack
            onClick={back}
            className="text-text/80 hover:text-text w-5 aspect-square cursor-pointer"
          />
          {account.name}
        </Label>
        <div className="flex gap-6 mt-4">
          <div className="flex flex-col items-start">
            <Label2 className="!text-text/60">Balance</Label2>

            <Label className={" font-semibold"}>
              {Number(account?.accountInfo?.balance).toFixed(2)}
            </Label>
          </div>
          <div className="flex flex-col items-start">
            <Label2 className="!text-text/60">Equity</Label2>

            <Label className={" font-semibold"}>
              {Number(account?.accountInfo?.equity).toFixed(2)}
            </Label>
          </div>
          <div className="flex flex-col items-start">
            <Label2 className="!text-text/60">Free margin</Label2>

            <Label className={" font-semibold"}>
              {Number(account?.accountInfo?.freeMargin).toFixed(2)}
            </Label>
          </div>
        </div>

        {account.positions?.length > 0 && (
          <div className="mt-3">
            <Label2 className="!text-text/60">Current Positions</Label2>
            <TradesTable data={account.positions} />
          </div>
        )}

        <div className="mt-4 flex flex-col w-full max-w-xs mx-auto">
          {!selectedPreset ? (
            <Fragment>
              {/* <Label2 className="!text-text/60">Choose an action</Label2>
              <TradeFrom /> */}

              <Label2 className="!text-text/60">Choose a preset</Label2>

              <Actions
                presetsActions={presetsActions}
                selectedPreset={selectedPreset}
                setSelectedPreset={setSelectedPreset}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Label className="flex items-center">
                <IoIosArrowBack
                  onClick={() => setSelectedPreset(null)}
                  className="text-text/80 hover:text-text w-5 aspect-square cursor-pointer"
                />
                {selectedPreset.name}
              </Label>
              <div className="my-2">
                <ActionDescription preset={selectedPreset} />
              </div>

              {error && <Error className="my-2">{error}</Error>}

              <Button
                onClick={async () => {
                  const r = await sendTrade();
                  // if (r && typeof close === "function") close();
                }}
                className="mt-3 w-full max-w-xs mx-auto"
                spinnerClassName="mt-3"
                icon={
                  <svg
                    className="h-3.5 aspect-square"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z"></path>
                    <path d="M22 2 11 13"></path>
                  </svg>
                }
              >
                Send
              </Button>
            </Fragment>
          )}
        </div>
      </section>
    </Fragment>
  );
}

function TradeFrom({}) {
  const [actionType, setActionType] = useState(0);
  return (
    <ButtonGroup className="mb-6 mx-auto mt-2">
      <Button_
        size="sm"
        className={`capitalize !text-sm rounded-lg bg-bg py-1  hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-text/60 ${
          actionType === 0 &&
          "text-text bg-text/20 hover:!bg-text/20 hover:text-btn"
        }`}
        onClick={() => setActionType(0)}
      >
        Preset
      </Button_>
      <Button_
        size="sm"
        className={`capitalize !text-sm rounded-lg bg-bg py-1  hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-text/60 ${
          actionType === 3 &&
          "text-text bg-text/20 hover:!bg-text/20 hover:text-btn"
        }`}
        onClick={() => setActionType(3)}
      >
        Webhook
      </Button_>
      <Button_
        size="sm"
        className={`capitalize !text-sm rounded-lg bg-bg py-1 hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-text/60 ${
          actionType === 2 &&
          "text-text bg-text/20 hover:!bg-text/20 hover:text-btn"
        }`}
        onClick={() => setActionType(2)}
      >
        Message
      </Button_>
    </ButtonGroup>
  );
}

function Actions({ presetsActions, selectedPreset, setSelectedPreset }) {
  const [actionType, setActionType] = useState(0);
  return (
    <Fragment>
      <div className="w-full flex flex-col mb-3">
        <ButtonGroup className="mb-6 mx-auto mt-2 w-full grid grid-cols-3">
          <Button_
            size="sm"
            className={`capitalize !text-sm rounded-lg bg-bg py-1  hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-text/60 truncate ${
              actionType === 0 &&
              "text-text bg-text/20 hover:!bg-text/20 hover:text-btn"
            }`}
            onClick={() => setActionType(0)}
          >
            Market Order
          </Button_>
          <Button_
            size="sm"
            className={`capitalize !text-sm rounded-lg bg-bg py-1  hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-text/60 truncate ${
              actionType === 3 &&
              "text-text bg-text/20 hover:!bg-text/20 hover:text-btn"
            }`}
            onClick={() => setActionType(3)}
          >
            Modify Order
          </Button_>
          <Button_
            size="sm"
            className={`capitalize !text-sm rounded-lg bg-bg py-1 hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-text/60 truncate ${
              actionType === 2 &&
              "text-text bg-text/20 hover:!bg-text/20 hover:text-btn"
            }`}
            onClick={() => setActionType(2)}
          >
            Close Order
          </Button_>
        </ButtonGroup>

        <div className="">
          {actionType === 0 && presetsActions.market?.length > 0 ? (
            <Fragment>
              {presetsActions.market.map((preset, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPreset(preset)}
                  className="relative px-2 py-2.5 max-w-xs mx-auto rounded-lg flex items-start justify-center cursor-pointer my-1.5"
                >
                  <div
                    style={{
                      backgroundColor: addAlpha(preset.color, 0.1),
                      outlineColor: preset.color,
                    }}
                    className={`${
                      selectedPreset?.id === preset.id
                        ? "opacity-60"
                        : "opacity-30"
                    } absolute inset-0 rounded-lg outline-1 outline-dashed hover:opacity-60 transition-all`}
                  />
                  <Label>{preset.name}</Label>
                </div>
              ))}
            </Fragment>
          ) : actionType === 2 && presetsActions.close?.length > 0 ? (
            <Fragment>
              {presetsActions.close.map((preset, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPreset(preset)}
                  className="relative px-2 py-2.5 max-w-xs mx-auto rounded-lg flex items-start justify-center cursor-pointer my-1.5"
                >
                  <div
                    style={{
                      backgroundColor: addAlpha(preset.color, 0.1),
                      outlineColor: preset.color,
                    }}
                    className={`${
                      selectedPreset?.id === preset.id
                        ? "opacity-60"
                        : "opacity-30"
                    } absolute inset-0 rounded-lg outline-1 outline-dashed hover:opacity-60 transition-all`}
                  />
                  <Label>{preset.name}</Label>
                </div>
              ))}
            </Fragment>
          ) : actionType === 3 && presetsActions.modify?.length > 0 ? (
            <Fragment>
              {presetsActions.modify.map((preset, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPreset(preset)}
                  className="relative px-2 py-2.5 max-w-xs mx-auto rounded-lg flex items-start justify-center cursor-pointer my-1.5"
                >
                  <div
                    style={{
                      backgroundColor: addAlpha(preset.color, 0.1),
                      outlineColor: preset.color,
                    }}
                    className={`${
                      selectedPreset?.id === preset.id
                        ? "opacity-60"
                        : "opacity-30"
                    } absolute inset-0 rounded-lg outline-1 outline-dashed hover:opacity-60 transition-all`}
                  />
                  <Label>{preset.name}</Label>
                </div>
              ))}
            </Fragment>
          ) : (
            <Fragment>
              <Par className="text-center text-xs">No preset availble!</Par>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}

function ActionDescription({ preset }) {
  return (
    <Fragment>
      {preset.type == 0 ? (
        <Fragment>
          <Label2>
            <span
              className={`${
                preset.data?.type.label == "Buy"
                  ? "text-long bg-long/10"
                  : preset.data?.type.label == "Sell"
                  ? "text-short bg-short/10"
                  : "text-text bg-text/10"
              } rounded px-1`}
            >
              {preset.data?.type.label}
            </span>{" "}
            Market order{" "}
            <span className={`${"text-text bg-text/10"} rounded px-1`}>
              {preset.data?.pair || ""}
            </span>
          </Label2>
          <Label2 className="mt-3">
            You&apos;re risking{" "}
            <span className={`${"text-text bg-text/10"} rounded px-1`}>
              {preset.data?.positionValuePercentage ||
                preset.data?.positionValue}
              {preset.data?.positionValuePercentage && "%"}
            </span>
          </Label2>
          <div className="mt-2 flex items-center justify-between">
            <Label2>
              StopLoss:{" "}
              <span
                className={`${
                  preset.data?.stopLoss
                    ? "text-loss bg-loss/10"
                    : "text-text bg-text/10"
                } rounded px-1`}
              >
                {preset.data?.stopLoss || "NA"}
              </span>
            </Label2>

            <Label2>
              TakeProfit:{" "}
              <span
                className={`${
                  preset.data?.takeProfit
                    ? "text-profit bg-profit/10"
                    : "text-text bg-text/10"
                } rounded px-1`}
              >
                {preset.data?.takeProfit || "NA"}
              </span>
            </Label2>
            <div />
          </div>
        </Fragment>
      ) : preset.type == 2 ? (
        <Fragment>
          <Label2>
            <span
              className={`${
                preset.data?.type.label == "Buy"
                  ? "text-long bg-long/10"
                  : preset.data?.type.label == "Sell"
                  ? "text-short bg-short/10"
                  : "text-text bg-text/10"
              } rounded px-1`}
            >
              {preset.data?.type.label}
            </span>{" "}
            Close order{" "}
            <span className={`${"text-text bg-text/10"} rounded px-1`}>
              {preset.data?.pair || "All trades"}
            </span>
          </Label2>
          <div className="mt-2 flex items-center justify-between">
            <Label2>
              Partial Close:{" "}
              <span
                className={`${
                  preset.data?.partialCloseValue
                    ? "text-profit bg-profit/10"
                    : "text-text bg-text/10"
                } rounded px-1`}
              >
                {preset.data?.partialCloseValue + "%" || "NA"}
              </span>
            </Label2>

            <Label2>
              Move BE:{" "}
              <span
                className={`${
                  preset.data?.moveToBE
                    ? "text-profit bg-profit/10"
                    : "text-text bg-text/10"
                } rounded px-1`}
              >
                {preset.data?.moveToBE ? "Activate" : "NA"}
              </span>
            </Label2>
            <div />
          </div>
        </Fragment>
      ) : preset.type == 3 ? (
        <Fragment>
          <Label2>
            <span
              className={`${
                preset.data?.type.label == "Buy"
                  ? "text-long bg-long/10"
                  : preset.data?.type.label == "Sell"
                  ? "text-short bg-short/10"
                  : "text-text bg-text/10"
              } rounded px-1`}
            >
              {preset.data?.type.label}
            </span>{" "}
            Modify order{" "}
            <span className={`${"text-text bg-text/10"} rounded px-1`}>
              {preset.data?.pair || "All trades"}
            </span>
          </Label2>

          <Label2 className="mt-2">
            StopLoss:{" "}
            <span
              className={`${
                preset.data?.stopLoss
                  ? "text-loss bg-loss/10"
                  : "text-text bg-text/10"
              } rounded px-1`}
            >
              {preset.data?.stopLoss || "NA"}
            </span>
          </Label2>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
}
