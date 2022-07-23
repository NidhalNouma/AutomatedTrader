import { Button, Dropdown } from "react-daisyui";
import { H6 } from "./H";

const Buttoni = ({ className, onClick, children }) => {
  return (
    <button className={`${className} `} onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonP = ({ className, icon, ...props }) => {
  return (
    <Button
      startIcon={icon}
      animation={true}
      size="sm"
      responds={true}
      className={`${className} py-0 h-7 px-4 capitalize hover:bg-primaryi bg-primaryi text-text-h !text-sm rounded-lg border-0`}
      {...props}
    />
  );
};

export const ButtonInfo = ({ className, onClick, children, helper }) => {
  return (
    <Dropdown hover={true} horizontal="right" vertical="top">
      <Button
        shape="circle"
        className={`${className} text-info`}
        color="ghost"
        size="xs"
        onClick={onClick}
      >
        {children}
      </Button>
      <Dropdown.Menu className="card compact w-auto !p-0 shadow bg-bgai rounded-xl">
        <div className="p-2">
          <H6>{helper}</H6>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};
