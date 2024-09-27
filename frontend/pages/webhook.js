import { useState, useEffect, Fragment } from "react";

import { withAuth } from "../contexts/UserContext";

import { MainLayoutWithHeader } from "../components/layout/MainLayout";
import { Button, RoundedButton } from "../components/ui/Button";
import { ModalWithHeader, UpgradeModal } from "../components/ui/Modal";
import WebhookForm from "../components/Forms/Webhook";
import { SubTitle3, Par, Label } from "../components/ui/Text";
import { RectangleSkeleton } from "../components/ui/Skeleton";

import WebhookItem from "../components/parts/WebhookItem";

import { useWebhook } from "../contexts/WebhookContext";
import { useUser } from "../contexts/UserContext";

import { PlusIcon } from "@heroicons/react/outline";

function Webhook() {
  const [newWebhookModal, setNewWebhookModal] = useState(false);
  const [openUpg, setOpenUpg] = useState(false);
  const [advanced, setAdvanced] = useState([]);

  const { webhooks } = useWebhook();
  const { fullUser } = useUser();

  useEffect(() => {
    if (webhooks?.length > 0) {
      let r = [];
      for (let i = 0; i < webhooks.length; i++) {
        let e = webhooks[i];
        if (e.advanced) r.push(e);
      }

      setAdvanced(r);
    }
  }, [webhooks]);

  return (
    <Fragment>
      <MainLayoutWithHeader
        page="webhook"
        title="Webhooks"
        rightSection={
          fullUser?.hasAccessTo?.webhooks &&
          fullUser?.hasAccessTo?.webhooks > webhooks?.length ? (
            <ModalWithHeader
              title="New webhook"
              trigger={
                <Button
                  className=" !bg-secondary !outline-secondary"
                  icon={<PlusIcon className="h-3.5 aspect-square" />}
                >
                  New
                </Button>
              }
              close={newWebhookModal}
            >
              <WebhookForm close={() => setNewWebhookModal(true)}></WebhookForm>
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
        {webhooks !== null ? (
          <section className="mt-4">
            {advanced.length > 0 && (
              <Fragment>
                <SubTitle3 className="">Advanced webhooks</SubTitle3>
                <div className="mt-1.5 mb-6 items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-6 gap-y-8">
                  {advanced
                    .sort((a, b) => b.created_at - a.created_at)
                    .map((v, i) => (
                      <Fragment key={v.id}>
                        <WebhookItem webhook={v} />
                      </Fragment>
                    ))}
                </div>
              </Fragment>
            )}

            {webhooks?.length > 0 ? (
              <Fragment>
                {advanced.length > 0 && webhooks.length > advanced.length && (
                  <SubTitle3 className="">Basic webhooks</SubTitle3>
                )}
                <div className="mt-1.5 items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 3xl:grid-cols-5 gap-x-6 gap-y-8">
                  {webhooks
                    .sort((a, b) => b.created_at - a.created_at)
                    .map(
                      (v, i) =>
                        !v.advanced && (
                          <Fragment key={v.id}>
                            <WebhookItem webhook={v} />
                          </Fragment>
                        )
                    )}
                </div>
              </Fragment>
            ) : (
              <div className="mt-3 w-full">
                <Par className="mt-8">No Webhooks available . </Par>
              </div>
            )}
          </section>
        ) : (
          <section className="mt-10 max-h-[80vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 3xl:grid-cols-5 gap-x-6 gap-y-8">
            <RectangleSkeleton />
            <RectangleSkeleton />
            <RectangleSkeleton />
            <RectangleSkeleton />
            <RectangleSkeleton />
            <RectangleSkeleton />
            <RectangleSkeleton />
            <RectangleSkeleton />
          </section>
        )}
      </MainLayoutWithHeader>
    </Fragment>
  );
}

export default withAuth(Webhook);
