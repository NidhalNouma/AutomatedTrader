import { Modal, Button } from "react-daisyui";

export const Modal1 = ({ open, close, children }) => {
  return (
    <Modal
      open={open}
      // onClickBackdrop={close}
      className="bg-accenti modali p-0"
      responsive={!true}
    >
      {/* <Modal.Header className="font-bold">
        Congratulations random Interner user!
      </Modal.Header>
      <Modal.Body>
        You&rsquo;ve been selected for a chance to get one year of subscription
        to 18 use Wikipedia for free!
      </Modal.Body> */}
      {/* <Modal.Actions>
        <Button onClick={toggleVisible}>Yay!</Button>
      </Modal.Actions> */}
      {children}
    </Modal>
  );
};
