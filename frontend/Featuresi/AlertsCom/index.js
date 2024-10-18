import { Fragment, useState } from "react";
import { ButtonText } from "../../components/ui/Button";

import Alert from "./Alert";

const Index = ({ alertsHook }) => {
  const [length, setLength] = useState(10);

  return (
    alertsHook?.length > 0 && (
      <Fragment>
        {alertsHook.map((v, i) => {
          return i < length ? (
            <Fragment key={i}>
              <Alert v={v} key={i} />
              <div className=" mb-2 border-b border-bga"></div>
            </Fragment>
          ) : (
            <Fragment></Fragment>
          );
        })}
        {alertsHook.length > 10 && (
          <div className="flex w-full">
            <ButtonText
              className="mx-auto"
              onClick={() => setLength(length === 10 ? alertsHook.length : 10)}
            >
              {length === 10 ? "Show all" : "Hide"}
            </ButtonText>
          </div>
        )}
      </Fragment>
    )
  );
};

export default Index;
