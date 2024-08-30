import { useState, Fragment, cloneElement, useEffect } from "react";
import { Modal as Modal_ } from "react-daisyui";
import { useRouter } from "next/router";
import { ButtonText, CloseButton, Button } from "./Button";
import { Par, SubTitle3, Title } from "./Text";

import { IoMdDoneAll } from "react-icons/io";
import { BiExit } from "react-icons/bi";

function ModalHeader({ title, onClose }) {
  return (
    <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
      <SubTitle3 className="">{title}</SubTitle3>
      <CloseButton onClick={onClose} />
    </div>
  );
}

export const Modal = ({
  open,
  close,
  children,
  className,
  title,
  withHeader = false,
  backclose = false,
  responsive = false,
}) => {
  return (
    <Modal_
      open={open}
      onClickBackdrop={backclose}
      className={"bg-bg modali p-0 w-9/12 max-w-lg max-h-[89vh] " + className}
      responsive={responsive}
    >
      {withHeader && <ModalHeader title={title} onClose={close} />}
      <div className="p-4">{children}</div>
    </Modal_>
  );
};

export const ModalWithHeader = ({
  children,
  trigger,
  title,
  className,
  close = false,
  backclose = false,
  responsive = false,
}) => {
  const [open, setOpen] = useState(false);

  const triggerWithHandler = cloneElement(trigger, {
    onClick: () => {
      setOpen(true);
    },
  });

  useEffect(() => {
    if (close === true || close === false) setOpen(false);
  }, [close]);

  return (
    <Fragment>
      {triggerWithHandler}
      <Modal_
        open={open}
        onClickBackdrop={backclose}
        className={"bg-bg modali p-0 w-9/12 max-w-lg max-h-[89vh] " + className}
        responsive={responsive}
      >
        <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
          <SubTitle3 className="">{title}</SubTitle3>
          <CloseButton onClick={() => setOpen(false)} />
        </div>
        <div className="p-4">{children}</div>
      </Modal_>
    </Fragment>
  );
};

export const WideModal = ({
  open,
  close,
  children,
  className,
  title,
  withHeader = false,
  backclose = false,
  responsive = false,
}) => {
  return (
    <Modal_
      open={open}
      onClickBackdrop={backclose}
      className={"bg-bg modali p-0 max-w-5xl max-h-[89vh] " + className}
      responsive={responsive}
    >
      {withHeader && <ModalHeader title={title} onClose={close} />}
      <div className="p-4">{children}</div>
    </Modal_>
  );
};

export const WideModalWithHeader = ({
  children,
  trigger,
  title,
  className,
  close = close,
  backclose = false,
  responsive = false,
}) => {
  const [open, setOpen] = useState(false);

  const triggerWithHandler = cloneElement(trigger, {
    onClick: () => setOpen(true),
  });

  useEffect(() => {
    if (close === true || close === false) setOpen(false);
  }, [close]);

  return (
    <Fragment>
      {triggerWithHandler}
      <Modal_
        open={open}
        onClickBackdrop={backclose}
        className={"bg-bg modali p-0 max-w-5xl max-h-[89vh] " + className}
        responsive={responsive}
      >
        <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
          <SubTitle3 className="">{title}</SubTitle3>
          <CloseButton onClick={() => setOpen(false)} />
        </div>
        <div className="p-4">{children}</div>
      </Modal_>
    </Fragment>
  );
};

export const TopModal = ({
  open,
  children,
  backclose = false,
  responsive = false,
}) => {
  return (
    <Modal_
      open={open}
      onClickBackdrop={backclose}
      className="bg-bg modalt p-0  max-h-[89vh] hideScrollbar mb-auto mt-12"
      responsive={responsive}
    >
      {children}
    </Modal_>
  );
};

export const EditModal = ({
  open,
  close,
  children,
  className,
  title,
  onSave,
  withHeader = false,
  backclose = false,
  responsive = false,
}) => {
  return (
    <Modal_
      open={open}
      onClickBackdrop={backclose}
      className={"bg-bg modali p-0 w-9/12 max-w-lg max-h-[89vh] " + className}
      responsive={responsive}
    >
      {withHeader && <ModalHeader title={title} onClose={close} />}
      <section className="p-4 flex flex-col">
        {children}
        <div className="w-full max-w-xs mx-auto mt-4 flex justify-around items-center">
          <ButtonText
            onClick={close}
            className="!text-text/80"
            icon={<BiExit className="h-4 aspect-auto rotate-180" />}
          >
            Back
          </ButtonText>
          <ButtonText
            className="text-accent/80"
            onClick={onSave}
            icon={<IoMdDoneAll className="h-4 aspect-auto" />}
          >
            Save
          </ButtonText>
        </div>
      </section>
    </Modal_>
  );
};

export const DeleteModal = ({
  open,
  close,
  children,
  className,
  title,
  onDelete,
  deleteBtnText = "Delete",
  withHeader = false,
  backclose = false,
  responsive = false,
}) => {
  return (
    <Modal_
      open={open}
      onClickBackdrop={backclose}
      className={"bg-bg modali p-0 w-9/12 max-w-lg max-h-[89vh] " + className}
      responsive={responsive}
    >
      {withHeader && <ModalHeader title={title} onClose={close} />}
      <section className="p-4 flex flex-col">
        {children}
        <div className="w-full max-w-xs mx-auto mt-4 flex justify-around items-center">
          <ButtonText
            onClick={close}
            className="!text-text/80"
            icon={<BiExit className="h-4 aspect-auto rotate-180" />}
          >
            Back
          </ButtonText>
          <ButtonText
            className="text-error/80"
            onClick={onDelete}
            icon={<IoMdDoneAll className="h-4 aspect-auto" />}
          >
            {deleteBtnText}
          </ButtonText>
        </div>
      </section>
    </Modal_>
  );
};

export const UpgradeModal = ({
  trigger,
  children,
  className,
  title = "Upgrade",
  withHeader = true,
  backclose = false,
  responsive = false,
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  let close = () => setOpen(false);

  const triggerWithHandler = cloneElement(trigger, {
    onClick: () => {
      setOpen(true);
    },
  });

  return (
    <Fragment>
      {triggerWithHandler}
      <Modal_
        open={open}
        onClickBackdrop={backclose}
        className={"bg-bg modali p-0 w-9/12 max-w-lg max-h-[89vh] " + className}
        responsive={responsive}
      >
        {withHeader && <ModalHeader title={title} onClose={close} />}
        <section className="p-4 flex flex-col">
          <div className="p-4">
            {children || (
              <Par className="text-sm">
                You don&apos;t have enough to access this feature, upgrade your
                plan below.
              </Par>
            )}
          </div>
          <div className="w-full max-w-xs mx-auto mt-4 flex justify-around items-center">
            {/* <ButtonText
              onClick={close}
              className="!text-text/80"
              icon={<BiExit className="h-4 aspect-auto rotate-180" />}
            >
              Back
            </ButtonText> */}
            <Button
              className=""
              onClick={() => router.push("/membership")}
              icon={<IoMdDoneAll className="h-4 aspect-auto" />}
            >
              Upgrade
            </Button>
          </div>
        </section>
      </Modal_>
    </Fragment>
  );
};
