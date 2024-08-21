import { Fragment, useState, useEffect } from "react";
import { withAuth } from "../../contexts/UserContext";
import { Button } from "../../components/ui/Button";
import { SubTitle2 } from "../../components/ui/Text";
import { MainLayoutWithHeader } from "../../components/layout/MainLayout";
import { ModalWithHeader } from "../../components/ui/Modal";
import NewAccountForm from "../../components/Forms/Binance";

import { PlusIcon } from "@heroicons/react/outline";

function Bitget() {
  const [openNewAccount, setOpenNewAccount] = useState(false);

  return (
    <Fragment>
      <MainLayoutWithHeader
        page="bitget"
        title="Bitget"
        rightSection={
          <ModalWithHeader
            close={openNewAccount}
            title="New Account"
            trigger={
              <Button
                className=" !bg-secondary !outline-secondary"
                icon={<PlusIcon className="h-3.5 aspect-square" />}
              >
                Account
              </Button>
            }
          >
            <NewAccountForm
              close={() => setOpenNewAccount(!openNewAccount)}
            ></NewAccountForm>
          </ModalWithHeader>
        }
      ></MainLayoutWithHeader>
    </Fragment>
  );
}

export default withAuth(Bitget);
