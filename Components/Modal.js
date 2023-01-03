import { Modal } from "react-daisyui";

export const Modal1 = ({
  open,
  children,
  backclose = false,
  responsive = false,
}) => {
  return (
    <Modal
      open={open}
      onClickBackdrop={backclose}
      className="bg-accent modali p-0 w-9/12 max-w-lg h-[89vh]"
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
      className="bg-accent modalt p-0"
      responsive={responsive}
    >
      {children}
    </Modal>
  );
};
