import { Fragment } from "react";
import { ScrollableButtons } from "../ui/ScrollableSection";
import Link from "next/link";

import { MainLayoutWithHeader } from "./MainLayout";
import SideNav from "../common/SideNav";
import Navbar from "../common/NavBar";
import { ButtonText } from "../ui/Button";

import Header from "../Landing/Header";

import { useUser } from "../../contexts/UserContext";

export default function DocsLayout({
  page = "help",
  title,
  children,
  docPage,
  sideNavLinks,
}) {
  const { user } = useUser();
  // let user = false;

  const linkCss = (pageName) =>
    `!text-base ${
      docPage === pageName
        ? "text-primary hover:text-primary hover:bg-transparent"
        : "text-text/80 hover:text-title"
    }`;

  return (
    <MainLayoutWithHeader page={page} title={title}>
      <ScrollableButtons className="mt-3 sticky top-[3.2rem] md:top-[4.2rem] bg-bgt py-3">
        <ButtonText className={linkCss("about")}>About us</ButtonText>
        <ButtonText className={linkCss("webhooks")}>Webhooks</ButtonText>
        <ButtonText className={linkCss("trades")}>Trades</ButtonText>
        <ButtonText className={linkCss("alerts")}>Alerts</ButtonText>
        <ButtonText className={linkCss("metatrader")}>Metatrader</ButtonText>
        <ButtonText className={linkCss("binance")}>Binance</ButtonText>
        <ButtonText className={linkCss("bitget")}>Bitget</ButtonText>
        <ButtonText className={linkCss("telegram")}>Telegram</ButtonText>
        <ButtonText className={linkCss("actions")}>Actions</ButtonText>
        <ButtonText className={linkCss("f&q")}>F&Q</ButtonText>
        <ButtonText className={linkCss("contact")}>Contact us</ButtonText>
      </ScrollableButtons>

      <section className="mt-4 flex items-start justify-center gap-8">
        <div className="grow max-w-3xl mx-auto">{children}</div>
        <RightNav
          className="w-56 mt-4 hidden md:block sticky top-36"
          links={sideNavLinks}
        />
      </section>
    </MainLayoutWithHeader>
  );
}

function RightNav({ className, links, children }) {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center", // Centers the section in the viewport
      });
    }
  };

  return (
    <Fragment>
      {links?.length > 0 && (
        <aside className={` ${className}`}>
          <ul className="space-y-4">
            {links?.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => handleScroll(link.id)}
                  className="text-text/60 hover:text-text text-sm transition-all truncate"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </Fragment>
  );
}
