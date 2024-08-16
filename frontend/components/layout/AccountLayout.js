import { Fragment } from "react";

export default function AccountLayout({
  className,
  sectionR1,
  sectionR2,
  sectionR3,
  sectionL1,
  sectionL2,
  sectionL3,
}) {
  return (
    <Fragment>
      <section
        className={`flex flex-col md:flex-row gap-8 max-w-full ${className}`}
      >
        <div className="flex flex-col md:w-4/12 md:order-1">
          <section className="">{sectionL1}</section>
          <section className="mt-6 md:mt-6">{sectionL2}</section>
          <section className="mt-6 md:mt-6 hidden sm:block">
            {sectionL3}
          </section>
        </div>
        <div className="flex flex-col grow md:order-2">
          <section className="mt-6 md:mt-0">{sectionR1}</section>
          <section className="mt-6">{sectionR2}</section>
          <section className="mt-6">{sectionR3}</section>

          <section className="mt-6 md:mt-6 block md:hidden">
            {sectionL3}
          </section>
        </div>
      </section>
    </Fragment>
  );
}
