import { Fragment } from "react";
import { ScrollableButtons } from "../ui/ScrollableSection";
import { useRouter } from "next/router";

import { MainLayoutWithHeader } from "./MainLayout";
import { ButtonText } from "../ui/Button";

export default function DocsLayout({
  page = "help",
  title,
  children,
  docPage,
  sideNavLinks,
}) {
  const router = useRouter();

  const linkCss = (pageName) =>
    `!text-base ${
      docPage === pageName
        ? "text-primary hover:text-primary hover:bg-transparent"
        : "text-text/80 hover:text-title"
    }`;

  return (
    <MainLayoutWithHeader page={page} title={title}>
      <ScrollableButtons className="mt-3 sticky top-[3.2rem] md:top-[4.2rem] bg-bgt py-3">
        <ButtonText
          onClick={() => router.push("/docs/aboutus")}
          className={linkCss("about")}
        >
          About us
        </ButtonText>
        <ButtonText
          onClick={() => router.push("/docs/webhooks")}
          className={linkCss("webhooks")}
        >
          Webhooks
        </ButtonText>
        <ButtonText
          className={linkCss("trades")}
          onClick={() => router.push("/docs/trades")}
        >
          Trades
        </ButtonText>
        <ButtonText
          className={linkCss("alerts")}
          onClick={() => router.push("/docs/alerts")}
        >
          Alerts
        </ButtonText>
        <ButtonText
          className={linkCss("metatrader")}
          onClick={() => router.push("/docs/metatrader")}
        >
          Metatrader
        </ButtonText>
        <ButtonText
          className={linkCss("binance")}
          onClick={() => router.push("/docs/binance")}
        >
          Binance
        </ButtonText>
        <ButtonText
          className={linkCss("bitget")}
          onClick={() => router.push("/docs/bitget")}
        >
          Bitget
        </ButtonText>
        <ButtonText
          className={linkCss("telegram")}
          onClick={() => router.push("/docs/telegram")}
        >
          Telegram
        </ButtonText>
        <ButtonText
          className={linkCss("actions")}
          onClick={() => router.push("/docs/actions")}
        >
          Actions
        </ButtonText>
        <ButtonText
          className={linkCss("f&q")}
          onClick={() => router.push("/docs/f&q")}
        >
          F&Q
        </ButtonText>
        <ButtonText
          className={linkCss("contact")}
          onClick={() => router.push("/docs/contact")}
        >
          Contact us
        </ButtonText>
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
        block: "center",
      });

      element.classList.add(
        "!bg-text/20",
        "transition-all",
        "duration-500",
        "rounded"
      );

      setTimeout(() => {
        element.classList.remove("!bg-text/20");
      }, 1350);
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
