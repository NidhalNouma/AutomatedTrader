import React from "react";
import SideNav from "../common/SideNav";
import Navbar from "../common/NavBar";
import { Title } from "../ui/Text";

export function MainLayout({ children, page }) {
  return (
    <div className="flex w-full mx-auto h-auto">
      <SideNav page={page} />
      <div className="grow flex flex-col max-w-full">
        <Navbar page={page} className="px-2 md:pr-8" />
        <main className="grow min-h-[80vh] mt-1 px-2 md:pr-8 mb-10">
          {children}
        </main>
      </div>
    </div>
  );
}

export function MainLayoutWithHeader({
  children,
  page,
  title,
  nextTitle,
  rightSection,
}) {
  return (
    <MainLayout page={page}>
      <section className="flex items-center justify-between">
        <div className="inline-flex items-center">
          <Title>{title}</Title>
          {nextTitle}
        </div>
        {rightSection}
      </section>
      {children}
    </MainLayout>
  );
}
