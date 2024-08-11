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
    <section
      className={`w-full flex gap-8 flex-col sm:flex-row max-w-full ${className}`}
    >
      <div className="flex flex-col w-full sm:w-4/12">
        <section className="">{sectionL1}</section>
        <section className="mt-6">{sectionL2}</section>
        <section className=" mt-6 ">{sectionL3}</section>
      </div>
      <div className="flex flex-col grow">
        <section className="">{sectionR1}</section>
        <section className="mt-6">{sectionR2}</section>
        <section className="mt-6">{sectionR3}</section>
      </div>
    </section>
  );
}
