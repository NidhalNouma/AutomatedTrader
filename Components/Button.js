import { Fragment, useRef, useState } from "react";
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
      className={`${className} py-0 h-7 px-4 capitalize hover:bg-primary bg-primary text-text-h rounded-lg border-0`}
      {...props}
    />
  );
};

export const ButtonText = ({ className, icon, ...props }) => {
  return (
    <Button
      startIcon={icon}
      animation={true}
      variant="link"
      size="sm"
      responds={true}
      className={`${className} px-0 py-0 h-7 capitalize text-secondaryi !text-sm rounded-lg border-0`}
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

export const ButtonFile = ({
  className,
  children,
  uploadChildren,
  onSelect,
  icon,
  ...props
}) => {
  const ref = useRef(null);
  const [upload, setUpload] = useState(false);

  return (
    <Fragment>
      <input
        className="hidden"
        type="file"
        ref={ref}
        accept="image/png, image/jpeg, image/jpg, image/gif"
        onChange={async (e) => {
          if (!upload) {
            setUpload(true);
            await onSelect(e);
            setUpload(false);
          }
        }}
      />

      <Button
        onClick={() => ref.current.click()}
        variant="link"
        startIcon={icon}
        animation={true}
        size="sm"
        responds={true}
        className={`${className} capitalize text-text-h`}
        {...props}
      >
        {upload ? uploadChildren : children}
      </Button>
    </Fragment>
  );
};
