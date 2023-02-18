import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";

import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";
import { ButtonText } from "../Components/Button";

import { Hi2, Hi3, Hi4 } from "../Components/H";

export default function Home() {
  const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();

  return (
    <>
      <Sidenav cpath="home" />
      <MainWithHeader>
        <Hi2 className="font-bold">
          Hi, <span className="text-text-h">{fullUser.displayName}</span>
        </Hi2>
        <Hi3 className="font-semibold mt-6">
          Those are 4 ways to make money with Automated Trader
        </Hi3>
        <div className="mt-4 grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          <Cardi no={1} title="Make your own bots">
            <p className="text-sm text-text-p mb-2">
              with amazing built in features to help you turn your Tradingview
              Alerts into profitable trades. Highly configurable and easy to
              manage. Works with all indicators and most prop firms, also tracks
              all account data so you can win more trades!
            </p>
            <ButtonText className="!text-accent mt-auto">Learn more</ButtonText>
          </Cardi>
          <Cardi no={2} title="Share your bots comings soon">
            <p className="text-sm text-text-p mb-2">
              Once you find a profitable system you can make it public and it
              will show on your profile for others to follow. You can also
              automate your tradingview alerts into telegram & discord & become
              a Signal provider just start looking for the perfect alerts!
            </p>
            <ButtonText className="!text-accent mt-auto">Learn more</ButtonText>
          </Cardi>
          <Cardi no={3} title="Copy other trader coming soon">
            <p className="text-sm text-text-p mb-2">
              Don&apos;t worry if you are new to trading with Automated Trader
              you can connect to traders around the world. Passive investing
              handsfree, just find a profitable trading solution that works for
              you. We show you all the users public data so you can know exactly
              what to expect when following a signal provider!
            </p>
            <ButtonText className="!text-accent mt-auto">Learn more</ButtonText>
          </Cardi>
          <Cardi no={4} title="Top of the line affiliate program coming soon">
            <p className="text-sm text-text-p mb-2">
              Competitive commission rates, which can add up quickly if you have
              a large and engaged audience. With every sale made through your
              affiliate link, you&apos;ll earn a percentage of the revenue,
              which can be a powerful way to monetize your website or social
              media presence.
            </p>
            <ButtonText className="!text-accent mt-auto">Learn more</ButtonText>
          </Cardi>
        </div>
      </MainWithHeader>
    </>
  );
}

function Cardi({ no, title, children }) {
  return (
    <div className="bg-bga p-4 rounded-lg flex flex-col items-start">
      <Hi4 className="font-semibold">
        <span className="mr-2 px-1 bg-text-p text-bg rounded">{no}</span>
        {title}
      </Hi4>
      <div className="text-text-p mt-2"></div>
      {children}
    </div>
  );
}
