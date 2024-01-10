import { Fragment, useState } from "react";
import {
  Input,
  Dropdown,
  Button,
  Toggle,
  Select,
  Range,
  Textarea,
} from "react-daisyui";
import { H6, Hi4 } from "./H";

export const Input1 = ({
  placeholder,
  name,
  helper,
  className,
  classNameInput,
  value,
  setValue,
  type,
  isTextArea,
  focus = false,
}) => {
  return (
    <div className={className + " form-control w-full max-w-xs"}>
      <label className="label">
        <span className="label-text text-text-h">{name}</span>
        <Helper message={helper} />
        {/* <span className="label-text-alt">Alt label</span> */}
      </label>

      {isTextArea ? (
        <Textarea
          size="sm"
          className={
            classNameInput +
            " bg-transparent border-primaryi focus:outline-primaryi placeholder-gray-600"
          }
          placeholder={placeholder}
          // disabled={disabled}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus={focus}
        />
      ) : (
        <Input
          autoFocus={focus}
          size="sm"
          className={
            classNameInput +
            " bg-transparent border-primaryi focus:outline-primaryi placeholder-gray-600"
          }
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
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
        <span className="label-text text-text-h flex items-center">{name}</span>
        <div>
          <Input
            size="sm"
            className="bg-transparent border-primaryi focus:outline-primaryi mx-2 w-24 placeholder-gray-600"
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
          <Dropdown.Menu className="w-44 !p-0 shadow bg-bga rounded-xl">
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
        <div className="flex justify-center item-center">
          <Toggle
            className="mx-2 "
            color="primary"
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

export const Togglew = ({ className, checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-8 h-4 bg-bga rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0 after:left-[1px] after:bg-text-h after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
    </label>
  );
};

export const Select1 = ({
  className,
  name,
  helper,
  options,
  value,
  setValue,
  size = "sm",
  defaultValue = 0,
}) => {
  return (
    <div className="p-1 w-full max-w-xs flex items-center justify-between">
      <span className="label-text text-text-h flex items-center">{name}</span>
      <div>
        <Select
          defaultValue={defaultValue}
          color="primary"
          size={size}
          className={`bg-transparent mx-2 w-24 ${className}`}
          value={options[value]}
          onChange={(e) => setValue(e)}
        >
          {/* <optgroup label=""> */}
          {options?.map((v, i) => (
            <option
              key={i}
              value={i}
              // defaultValue={i?.toString() === value?.toString()}
            >
              {v}
            </option>
          ))}
          {/* </optgroup> */}
        </Select>
        <Helper message={helper} />
      </div>
    </div>
  );
};

export function Range1({ name, value, setValue }) {
  return (
    <div className="p-1 w-full max-w-xs">
      <span className="label-text text-text-h flex items-center mb-2 mt-1">
        {name}
      </span>
      <div className="w-full max-w-xs">
        {/* <input
        color="primary"
        type="range"
        min="0"
        max="100"
        // value="25"
        className="range"
        step="25"
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>1%</span>
        <span>2%</span>
        <span>5%</span>
        <span>|</span>
        <span>|</span>
      </div> */}
        <div className="hideSpan">
          <Range
            color="primary"
            size="xs"
            max="20"
            step={0.25}
            min="0.25"
            value={value}
            onChange={(v) => setValue(v.target.value)}
          />
        </div>
        <div className="w-full flex justify-between items-center text-xs px-2 my-1">
          <span className="text-text-h font-bold mx-auto">{value}%</span>
          {/* <span>1%</span>
          <span>2%</span>
          <span>5%</span>
          <span>7.5%</span>
          <span>10%</span>
          <span>20%</span> */}
        </div>
      </div>
    </div>
  );
}

export function EditInput({
  className,
  children,
  name,
  text,
  onEdit,
  displayText,
  type,
  isTextArea,
}) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(text);
  const [done, setDone] = useState(false);

  return (
    <div className={`${className} w-full`}>
      <div className="w-full flex items-center justify-between">
        <H6>{name}</H6>
        {!edit ? (
          <Button
            size="sm"
            color="secondary"
            className="text-secondary capitalize"
            variant="link"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
        ) : (
          <div className="">
            {done ? (
              <span className="text-success text-sm font-semibold">
                Saving ...
              </span>
            ) : (
              <Fragment>
                <Button
                  size="sm"
                  color="secondary"
                  className="text-error capitalize"
                  variant="link"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color="secondary"
                  className="text-success capitalize"
                  variant="link"
                  onClick={async () => {
                    if (value === text) {
                      setEdit(false);
                      return;
                    }
                    setDone(true);
                    const r = await onEdit(value);

                    setEdit(false);
                    setDone(false);
                  }}
                >
                  Save
                </Button>
              </Fragment>
            )}
          </div>
        )}
      </div>
      <div className="">
        {!edit ? (
          <Hi4 className="text-sm">{text ? text : displayText}</Hi4>
        ) : isTextArea ? (
          <Textarea
            size="sm"
            className="bg-transparent border-primaryi focus:outline-primaryi w-full placeholder-gray-600"
            // placeholder={placeholder}
            // disabled={disabled}
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <Input
            size="sm"
            className="bg-transparent border-primaryi focus:outline-primaryi w-full placeholder-gray-600"
            // placeholder={placeholder}
            // disabled={disabled}
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
