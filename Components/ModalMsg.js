import { Button } from "react-daisyui";
import { H3 } from "./H";

export const DeleteMessage = ({
  close,
  title,
  children,
  onDelete,
  btnDelText = "Delete",
}) => {
  return (
    <div className="mb-1">
      <div className="sticky top-0 bg-accenti p-4 z-20 flex justify-between items-center">
        <H3 className="flex">{title}</H3>
        <Button
          size="sm"
          shape="circle"
          className=" bg-bga"
          onClick={() => {
            close();
          }}
        >
          ✕
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center w-full mt-2">
        {children}

        <div className="flex items-center justify-between ">
          <Button
            className="p-0 text-secondary mr-12"
            variant="link"
            color=""
            onClick={() => close()}
          >
            Cancel
          </Button>
          <Button
            className="p-0 text-error"
            variant="link"
            color=""
            onClick={async () => {
              await onDelete();
              close();
            }}
          >
            {btnDelText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const EditMessage = ({ close, title, children, onEdit }) => {
  return (
    <div className="mb-1">
      <div className="sticky top-0 bg-accenti p-4 z-20 flex justify-between items-center">
        <H3 className="flex">{title}</H3>
        <Button
          size="sm"
          shape="circle"
          className=" bg-bga"
          onClick={() => {
            close();
          }}
        >
          ✕
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        {children}

        <div className="flex items-center justify-between ">
          <Button
            className="p-0 text-error mr-12"
            variant="link"
            color=""
            onClick={() => close()}
          >
            Cancel
          </Button>
          <Button
            className="p-0 text-secondary"
            variant="link"
            color=""
            onClick={async () => {
              await onEdit();
              close();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
