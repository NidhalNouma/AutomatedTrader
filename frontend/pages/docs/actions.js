import { Fragment } from "react";

import DocsLayout from "../../components/layout/DocsLayout";
import { Par, SubTitle3 } from "../../components/ui/Text";

export default function Actions() {
  return (
    <Fragment>
      <DocsLayout title="Actions" docPage="actions">
        <div className="mt-6">
          <h2>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which dont look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isnt anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum There are many variations of
            passages of Lorem Ipsum available, but the majority have suffered
            alteration in some form, by injected humour, or randomised words
            which dont look even slightly believable. If you are going to use a
            passage of Lorem Ipsum, you need to be sure there isnt anything
            embarrassing hidden in the middle of text. All the Lorem Ipsum{" "}
          </h2>
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
      </DocsLayout>
    </Fragment>
  );
}

const Index = ({ index, text }) => {
  return (
    <div className="my-2">
      <h3 className="inline">{index} :</h3>

      <p className="ml-2 inline">
        {text}
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form,
      </p>
    </div>
  );
};
