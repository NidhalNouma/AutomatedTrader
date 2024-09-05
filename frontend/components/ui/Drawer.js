import { Fragment, useState, cloneElement } from "react";
import { SubTitle3 } from "./Text";
import { CloseButton } from "./Button";

export function LeftDrawer({ children, onClickOverlay, open }) {
  return (
    <div
      className={
        " fixed overflow-hidden z-50 bg-bg/40 bg-opacity-25 inset-0 transform ease-in-out " +
        (open
          ? " transition-opacity opacity-100 duration-200 translate-x-0  "
          : " transition-all delay-200 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          ` w-screen max-w-[15rem] left-0 absolute bg-bgt h-full shadow-xl duration-200 ease-in-out transition-all transform  ` +
          (open ? " translate-x-0 " : ` translate-x-[-15rem] `)
        }
      >
        <article
          className={`bg-bgt relative w-screen max-w-[15rem] pb-10 flex flex-col space-y-6 h-full`}
        >
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          onClickOverlay(false);
        }}
      ></section>
    </div>
  );
}

export function RightDrawerWithHeader({
  children,
  trigger,
  title,
  onClickOverlay = true,
}) {
  const [open, setOpen] = useState(false);

  const triggerWithHandler = cloneElement(trigger, {
    onClick: () => {
      setOpen(true);
    },
  });

  return (
    <Fragment>
      {triggerWithHandler}
      <div
        className={
          "fixed overflow-hidden z-50 bg-bg/40 bg-opacity-25 inset-0 transform ease-in-out " +
          (open
            ? "transition-opacity opacity-100 duration-200 translate-x-0"
            : "transition-all delay-200 opacity-0 translate-x-full")
        }
      >
        <section
          className={
            `w-screen max-w-sm sm:max-w-xl right-0 absolute bg-bgt h-full shadow-xl duration-200 ease-in-out transition-all transform ` +
            (open ? "translate-x-0" : "translate-x-full")
          }
        >
          <article
            className={`bg-bgt relative w-screen max-w-sm sm:max-w-xl pb-10 flex flex-col h-full`}
          >
            <div className="sticky top-0 bg-bgt p-4 z-20 flex justify-between items-center">
              <SubTitle3 className="">{title}</SubTitle3>
              <CloseButton onClick={() => setOpen(false)} />
            </div>

            {children}
          </article>
        </section>
        <section
          className=" w-screen h-full cursor-pointer "
          onClick={() => {
            if (onClickOverlay) setOpen(false);
          }}
        ></section>
      </div>
    </Fragment>
  );
}
