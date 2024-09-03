import { useState, useEffect, Fragment } from "react";

import { withAuth } from "../contexts/UserContext";

import { MainLayoutWithHeader } from "../components/layout/MainLayout";
import { Button, RoundedButton } from "../components/ui/Button";
import { Label, SubTitle3 } from "../components/ui/Text";
import { ModalWithHeader, UpgradeModal } from "../components/ui/Modal";
import PresetForm from "../components/Forms/Preset";
import { RectangleSkeleton } from "../components/ui/Skeleton";
import PresetItem from "../components/parts/PresetItem";

import { useUser } from "../contexts/UserContext";

import { PlusIcon } from "@heroicons/react/outline";

import { usePreset } from "../contexts/PresetsContext";

function Presets() {
  const [newPresetModal, setNewPresetModal] = useState(false);
  const { fullUser } = useUser();
  const { presets } = usePreset();

  let marketOrders = presets?.filter((preset) => preset.type == 0) || [];
  let modifyOrders = presets?.filter((preset) => preset.type == 3) || [];
  let closeOrders = presets?.filter((preset) => preset.type == 2) || [];

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
              <PresetForm close={() => setNewPresetModal(true)}></PresetForm>
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
      >
        {presets?.length > 0 ? (
          <Fragment>
            {marketOrders.length > 0 && (
              <Fragment>
                <SubTitle3 className="mt-4">Market Orders</SubTitle3>

                <section className="mt-1.5 max-h-[80vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 3xl:grid-cols-5 gap-x-6 gap-y-8 mb-1">
                  {marketOrders.map((p, i) => (
                    <PresetItem key={i} preset={p} />
                  ))}
                </section>
              </Fragment>
            )}
            {modifyOrders.length > 0 && (
              <Fragment>
                <SubTitle3 className="mt-4">Modify Orders</SubTitle3>

                <section className="mt-1.5 max-h-[80vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 3xl:grid-cols-5 gap-x-6 gap-y-8 mb-1">
                  {modifyOrders.map((p, i) => (
                    <PresetItem key={i} preset={p} />
                  ))}
                </section>
              </Fragment>
            )}
            {closeOrders.length > 0 && (
              <Fragment>
                <SubTitle3 className="mt-4">Close Orders</SubTitle3>

                <section className="mt-1.5 max-h-[80vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 3xl:grid-cols-5 gap-x-6 gap-y-8 mb-1">
                  {closeOrders.map((p, i) => (
                    <PresetItem key={i} preset={p} />
                  ))}
                </section>
              </Fragment>
            )}
          </Fragment>
        ) : presets == null ? (
          <section className="mt-10 max-h-[80vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 3xl:grid-cols-5 gap-x-6 gap-y-8">
            <RectangleSkeleton className="!h-44" />
            <RectangleSkeleton className="!h-44" />
            <RectangleSkeleton className="!h-44" />
            <RectangleSkeleton className="!h-44" />
            <RectangleSkeleton className="!h-44" />
            <RectangleSkeleton className="!h-44" />
            <RectangleSkeleton className="!h-44" />
            <RectangleSkeleton className="!h-44" />
          </section>
        ) : (
          <Fragment></Fragment>
        )}
      </MainLayoutWithHeader>
    </Fragment>
  );
}

export default withAuth(Presets);
