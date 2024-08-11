import React from "react";

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
