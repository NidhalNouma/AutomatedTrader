import { Fragment } from "react";
import { Input, Dropdown, Button, Toggle, Select } from "react-daisyui";
import { H6 } from "./H";

export const Input1 = ({
  placeholder,
  name,
  helper,
  className,
  classNameInput,
  value,
  setValue,
  type,
}) => {
  return (
    <div className={className + " form-control w-full max-w-xs"}>
      <label className="label">
        <span className="label-text text-text-h">{name}</span>
        <Helper message={helper} />
        {/* <span className="label-text-alt">Alt label</span> */}
      </label>
      <Input
        size="sm"
        className={classNameInput + " border-primaryi focus:outline-primaryi"}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* <label className="label">
          <span className="label-text-alt">Alt label</span>
          <span className="label-text-alt">Alt label</span>
        </label> */}
    </div>
  );
};

export const Input1Inline = ({
  placeholder,
  name,
  helper,
  disabled,
  type,
  value,
  setValue,
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text text-text-h">{name}</span>
        <div>
          <Input
            size="sm"
            className="bg-accenti border-primaryi focus:outline-primaryi mx-2 w-24"
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Helper message={helper} />
        </div>
        {/* <span className="label-text-alt">Alt label</span> */}
      </label>
    </div>
  );
};

export const Helper = ({ message }) => {
  return (
    <Fragment>
      {message && (
        <Dropdown hover={true} horizontal="left" vertical="middle">
          <Button shape="circle" className="text-info" color="ghost" size="xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </Button>
          <Dropdown.Menu className="card compact w-auto !p-0 shadow bg-bga rounded-xl">
            <div className="p-2">
              <H6>{message}</H6>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Fragment>
  );
};

export const Toggle1 = ({ className, name, helper, value, setValue }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text text-text-h flex items-center">{name}</span>
        <div>
          <Toggle
            className="mx-2"
            color="accent"
            size="sm"
            checked={value}
            onChange={setValue}
          />
          <Helper message={helper} />
        </div>
        {/* <span className="label-text-alt">Alt label</span> */}
      </label>
    </div>
  );
};

export const Select1 = ({
  className,
  name,
  helper,
  options,
  value,
  setValue,
}) => {
  return (
    <div className="p-1 w-full max-w-xs flex items-center justify-between">
      <span className="label-text text-text-h flex items-center">{name}</span>
      <div>
        <Select
          size="sm"
          className="bg-accenti mx-2 w-24"
          value={value}
          onChange={(e) => setValue(e)}
        >
          {options?.map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </Select>
        <Helper message={helper} />
      </div>
    </div>
  );
};
