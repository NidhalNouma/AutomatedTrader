import { useState, useEffect, Fragment } from "react";

import { withAuth } from "../contexts/UserContext";

import { MainLayoutWithHeader } from "../components/layout/MainLayout";
import { Button, RoundedButton } from "../components/ui/Button";
import { ModalWithHeader, UpgradeModal } from "../components/ui/Modal";

import { useUser } from "../contexts/UserContext";

import { PlusIcon } from "@heroicons/react/outline";

function Presets() {
  const [newPresetModal, setNewPresetModal] = useState(false);
  const { fullUser } = useUser();
  let presets = [];

  return (
    <Fragment>
      <MainLayoutWithHeader
        page="presets"
        title="Presets"
        rightSection={
          fullUser?.hasAccessTo?.presets &&
          fullUser?.hasAccessTo?.presets > presets?.length ? (
            <ModalWithHeader
              title="New preset"
              trigger={
                <Button
                  className=" !bg-secondary !outline-secondary"
                  icon={<PlusIcon className="h-3.5 aspect-square" />}
                >
                  New
                </Button>
              }
              close={newPresetModal}
            >
              {/* <WebhookForm close={() => setNewWebhookModal(true)}></WebhookForm> */}
            </ModalWithHeader>
          ) : (
            <UpgradeModal
              trigger={
                <Button
                  className=" !bg-secondary !outline-secondary"
                  icon={<PlusIcon className="h-3.5 aspect-square" />}
                >
                  New
                </Button>
              }
            ></UpgradeModal>
          )
        }
      ></MainLayoutWithHeader>
    </Fragment>
  );
}

export default withAuth(Presets);
