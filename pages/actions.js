import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";

import { H1, Hi6, H4 } from "../Components/H";

export default function Actions() {
  return (
    <>
      <Sidenav cpath="actions" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-10 py-6">
          <H1>Actions</H1>
          <div className="mt-6">
            <Hi6>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which dont look even slightly
              believable. If you are going to use a passage of Lorem Ipsum, you
              need to be sure there isnt anything embarrassing hidden in the
              middle of text. All the Lorem Ipsum There are many variations of
              passages of Lorem Ipsum available, but the majority have suffered
              alteration in some form, by injected humour, or randomised words
              which dont look even slightly believable. If you are going to use
              a passage of Lorem Ipsum, you need to be sure there isnt anything
              embarrassing hidden in the middle of text. All the Lorem Ipsum{" "}
            </Hi6>
          </div>
          <div className="px-6 py-3 bg-bga mt-4 rounded-xl">
            <Index index="-P" text="" />
            <Index index="-PO" text="" />
            <Index index="-POV" text="" />
            <Index index="-SL" text="" />
            <Index index="-TP" text="" />
            <Index index="-TS" text="" />
            <Index index="-TSs" text="" />
            <Index index="-TSo" text="" />
            <Index index="-TSe" text="" />
            <Index index="-BE" text="" />
            <Index index="-SP" text="" />
            <Index index="-PP" text="" />
            <Index index="-TF" text="" />
            <Index index="-TIS" text="" />
            <Index index="-TIE" text="" />
            <Index index="-HE" text="" />
            <Index index="-POD" text="" />
            <Index index="-MT" text="" />
            <Index index="-MXSS" text="" />
            <Index index="-MXp" text="" />
            <Index index="-MXl" text="" />
          </div>
        </div>
      </div>
    </>
  );
}

const Index = ({ index, text }) => {
  return (
    <div className="my-2">
      <H4 className="inline">{index} :</H4>

      <Hi6 className="ml-2 inline">
        {text}
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form,
      </Hi6>
    </div>
  );
};
