import { Modal } from "react-daisyui";

export const Modal1 = ({
  open,
  children,
  className,
  backclose = false,
  responsive = false,
}) => {
  return (
    <Modal
      open={open}
      onClickBackdrop={backclose}
      className={"bg-bg modali p-0 w-9/12 max-w-lg max-h-[89vh] " + className}
      responsive={responsive}
    >
      {children}
    </Modal>
  );
};

export const ModalBig1 = ({
  open,
  children,
  backclose = false,
  responsive = false,
}) => {
  return (
    <Modal
      open={open}
      onClickBackdrop={backclose}
      className="bg-bg modali p-0 w-11/12 max-w-5xl max-h-[89vh]"
      responsive={responsive}
    >
      {children}
    </Modal>
  );
};

export const Modalt = ({
  open,
  children,
  backclose = false,
  responsive = false,
}) => {
  return (
    <Modal
      open={open}
      onClickBackdrop={backclose}
      className="bg-bg modalt p-0"
      responsive={responsive}
    >
      {children}
    </Modal>
  );
};
