import { Fragment, useRef, useState, useEffect } from "react";
import {
  Input as Input_,
  Dropdown,
  Button as Button_,
  Toggle as Toggle_,
  Range as Range_,
  Textarea,
} from "react-daisyui";
import { default as Select_ } from "react-select";
import { Par, Label } from "./Text";
import { BsInfoSquare } from "react-icons/bs";

import classNames from "classnames";
import { Info } from "./Alerts";

export const Toggle = ({ className, checked, onChange }) => {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={async () => {
          await onChange();
        }}
      />
      <div className="w-8 h-4 bg-text/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-text/80 after:content-[''] after:absolute after:top-0 after:left-[1px] after:bg-light/60 after:border-text after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-primary"></div>
    </label>
  );
};

export const ToggleInline = ({
  className,
  checked,
  onChange,
  helper,
  name,
}) => {
  return (
    <div
      className={
        className + "  w-full max-w-xs flex items-center justify-between"
      }
    >
      <label className="label pl-0">
        <span className="label-text text-title/60">{name}</span>
        {/* <span className="label-text-alt">Alt label</span> */}
      </label>
      <div className="">
        <label
          className={`relative inline-flex items-center cursor-pointer ${className}`}
        >
          <input
            type="checkbox"
            className="sr-only peer text-btn"
            checked={checked}
            onChange={async () => {
              await onChange();
            }}
          />
          <div className="w-8 h-4 bg-text/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-text/80 after:content-[''] after:absolute after:top-0 after:left-[1px] after:bg-light/60 after:border-text after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-primary"></div>
        </label>
        <Helper message={helper} className="ml-2" />
      </div>
    </div>
  );
};

export const Input = ({
  placeholder,
  name,
  helper,
  className,
  classNameInput,
  value,
  setValue,
  type,
  isTextArea,
  focus,
}) => {
  const inputRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focus !== undefined) {
      if (inputRef) {
        if (focus) inputRef?.current.focus();
        else inputRef?.current.blur();
      }
    }
  }, [focus]);

  return (
    <div className={className + " form-control w-full max-w-xs"}>
      <label className="label px-0 mb-0.5 ">
        <span
          className="label-text text-title/60"
          onClick={() => {
            if (focus === undefined) inputRef?.current.focus();
          }}
        >
          {name}
        </span>
        <Helper message={helper} />
        {/* <span className="label-text-alt">Alt label</span> */}
      </label>

      {isTextArea ? (
        <Textarea
          ref={inputRef}
          size="sm"
          className={
            classNameInput +
            " bg-transparent outline-dashed outline-1 outline-primary focus:outline-primary border-none text-sm w-full rounded-lg placeholder-text/40 text-text h-min py-2"
          }
          placeholder={placeholder}
          // disabled={disabled}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <Input_
          ref={inputRef}
          size="sm"
          className={
            classNameInput +
            " bg-transparent outline-dashed outline-1 outline-primary focus:outline-primary border-none text-sm w-full rounded-lg placeholder-text/40 text-text h-min py-2"
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

export const InputInline = ({
  placeholder,
  name,
  helper,
  disabled,
  type,
  value,
  setValue,
  className,
  focus,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (focus !== undefined) {
      if (inputRef) {
        if (focus) inputRef?.current.focus();
        else inputRef?.current.blur();
      }
    }
  }, [focus]);

  return (
    <div className={`w-full max-w-xs ${className}`}>
      <label className="label px-0">
        <span
          className="text-sm text-title/60 flex items-center"
          onClick={() => {
            if (focus === undefined) inputRef?.current.focus();
          }}
        >
          {name}
        </span>
        <div className="flex items-center">
          <Input_
            ref={inputRef}
            size="sm"
            className="bg-transparent outline-dashed outline-1 outline-primary focus:outline-primary ml-2 text-sm w-28 border-none rounded-lg placeholder-text/40 text-text h-min py-2"
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Helper message={helper} className="ml-2" />
        </div>
        {/* <span className="label-text-alt">Alt label</span> */}
      </label>
    </div>
  );
};

export const Helper = ({ message, className }) => {
  return (
    <Fragment>
      {message && (
        <Dropdown hover={true} horizontal="left" vertical="top">
          <span className={`text-info cursor-pointer ${className}`}>
            <BsInfoSquare className="w-5 aspect-square stroke-current" />
          </span>
          <Dropdown.Menu className="w-[13rem] !p-0 !m-0 shadow">
            <Info>{message}</Info>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Fragment>
  );
};

export const Select = ({
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
    <div
      className={`w-full max-w-xs flex items-center justify-between ${className}`}
    >
      <span className="text-sm text-title/60 flex items-center">{name}</span>
      <div className="flex items-center">
        <Select_
          defaultValue={defaultValue}
          color="primary"
          unstyled
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              outline: 1,
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              zIndex: 9999,
            }),
            menuPortal: (baseStyles) => ({
              ...baseStyles,
              zIndex: 9999,
            }),
          }}
          classNames={{
            clearIndicator: ({ isFocused }) =>
              classNames(
                isFocused ? "text-neutral-600" : "text-neutral-200",
                "p-2",
                isFocused ? "hover:text-neutral-800" : "hover:text-neutral-400"
              ),
            // container: () => classNames(),
            control: ({ isDisabled, isFocused }) =>
              classNames(
                isDisabled ? "bg-neutral-50" : "bg-transparent",
                "!outline-1",
                "!outline-dashed",
                "!outline-offset-0",
                "!outline-primary",
                "rounded-lg",
                "py-0",
                "text-sm",
                "w-28",
                "!cursor-pointer",
                isFocused
                  ? "hover:border-purple-800"
                  : "hover:border-neutral-300"
              ),
            dropdownIndicator: ({ isFocused }) =>
              classNames(
                isFocused ? "text-primary" : "text-primary/60",
                "pr-2",
                "hover:text-primary"
              ),
            group: () => classNames("py-2"),
            groupHeading: () =>
              classNames(
                "text-text/60",
                "text-xs",
                "font-medium",
                "mb-1",
                "px-3",
                "uppercase"
              ),
            // indicatorsContainer: () => classNames(),
            indicatorSeparator: ({ isDisabled }) =>
              classNames(
                isDisabled ? "bg-transparent" : "bg-transparent",
                "mx-1"
              ),
            input: () => classNames("m-0", "py-0", "text-text"),
            loadingIndicator: ({ isFocused }) =>
              classNames(isFocused ? "text-text/30" : "text-text/60", "p-1"),
            loadingMessage: () => classNames("text-text/60", "py-1", "px-3"),
            menu: () =>
              classNames(
                "bg-bg/80",
                "backdrop-blur-xl",
                "border",
                "border-primary/80",
                "rounded-lg",
                // "shadow-[0_0_0_1px_rgba(0,0,0,0.1)]",
                "my-1",
                "z-10",
                "absolute",
                "top-0"
              ),
            menuList: () => classNames("py-1"),
            // menuPortal: () => classNames(),
            multiValue: () =>
              classNames("bg-transparent", "rounded-sm", "m-0.5"),
            multiValueLabel: () =>
              classNames(
                "rounded-lg",
                "text-text",
                "text-sm",
                "p-[3]",
                "pl-[6]"
              ),
            multiValueRemove: ({ isFocused }) =>
              classNames(
                "rounded-sm",
                isFocused && "bg-red-500",
                "px-1",
                "hover:bg-red-500",
                "hover:text-red-800"
              ),
            noOptionsMessage: () =>
              classNames("text-text/40", "text-sm", "py-3", "px-3"),
            option: ({ isDisabled, isFocused, isSelected }) =>
              classNames(
                "text-text/80",
                "!text-sm",
                "hover:text-text",
                "!cursor-pointer",
                "py-2",
                "px-3",
                !isDisabled &&
                  (isSelected
                    ? "active:bg-transparent"
                    : "active:bg-transparent")
              ),
            placeholder: () => classNames("text-text/40", "mx-0.5"),
            singleValue: ({ isDisabled }) =>
              classNames(isDisabled ? "text-text/60" : "text-text", "mx-0.5"),
            valueContainer: () => classNames("py-0.5", "px-2"),
          }}
          // className={`bg-transparent outline-primary hover:border-primary rounded-lg  text-sm text-text mx-2 w-28 ${className}`}
          value={value}
          onChange={(e) => setValue(e)}
          options={options}
          menuPortalTarget={document.body} // Render the menu in the body
          // menuPosition="fixed" // Fix the position of the menu
          menuShouldBlockScroll={true} // Block scroll when menu is open
        ></Select_>
        <Helper message={helper} className="ml-2" />
      </div>
    </div>
  );
};

export function Range({
  name,
  nextValue,
  value,
  setValue,
  className,
  helper,
  max,
  min,
  step,
}) {
  return (
    <div className={`w-full max-w-xs ${className}`}>
      <div className="flex items-center justify-between mb-2 w-full">
        <label className="label p-0">
          <div className="label-text ">
            <span className="text-title/60 flex items-center">{name}</span>
          </div>
        </label>
        <div className="flex items-center">
          <span className="text-text font-bold mx-auto ">
            {value}
            {nextValue}
          </span>
          <Helper message={helper} className="ml-2" />
        </div>
      </div>
      <div className="w-full max-w-xs">
        <div className="hideSpan">
          <Range_
            className="bg-primary/30 "
            color="primary"
            size="xs"
            max={max}
            step={step}
            min={min}
            value={value}
            onChange={(v) => setValue(v.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export const SelectFull = ({
  className,
  helper,
  options,
  value,
  setValue,
  defaultValue = 0,
  selectClassName = "",
}) => {
  return (
    <div
      className={`w-full max-w-full flex items-center justify-between ${className}`}
    >
      <div className="flex items-center w-full">
        <Select_
          defaultValue={defaultValue}
          unstyled
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              outline: 1,
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              zIndex: 9999,
            }),
            menuPortal: (baseStyles) => ({
              ...baseStyles,
              zIndex: 9999,
            }),
          }}
          classNames={{
            clearIndicator: ({ isFocused }) =>
              classNames(
                isFocused ? "text-neutral-600" : "text-neutral-200",
                "p-2",
                isFocused ? "hover:text-neutral-800" : "hover:text-neutral-400"
              ),
            container: () => classNames("w-full"),
            control: ({ isDisabled, isFocused }) =>
              classNames(
                isDisabled ? "bg-neutral-50" : "bg-transparent",
                "!outline-1",
                "!outline-dashed",
                "!outline-offset-0",
                "outline-text/30",
                "rounded-lg",
                "py-0",
                "text-sm",
                "w-full",
                "!max-w-full",
                "!cursor-pointer",
                "!min-h-0",
                "!py-1",
                selectClassName,
                isFocused
                  ? "hover:border-purple-800"
                  : "hover:border-neutral-300"
              ),
            dropdownIndicator: ({ isFocused }) =>
              classNames(
                isFocused ? "text-text" : "text-text/60",
                "pr-2",
                "hover:text-text"
              ),
            group: () => classNames("py-2"),
            groupHeading: () =>
              classNames(
                "text-text/60",
                "text-xs",
                "font-medium",
                "mb-1",
                "px-3",
                "uppercase"
              ),
            // indicatorsContainer: () => classNames(),
            indicatorSeparator: ({ isDisabled }) =>
              classNames(
                isDisabled ? "bg-transparent" : "bg-transparent",
                "mx-1"
              ),
            input: () =>
              classNames("m-0", "py-0", "text-text", "text-sm", "w-full"),
            loadingIndicator: ({ isFocused }) =>
              classNames(isFocused ? "text-text/30" : "text-text/60", "p-1"),
            loadingMessage: () => classNames("text-text/60", "py-1", "px-3"),
            menu: () =>
              classNames(
                "bg-bg/80",
                "backdrop-blur-xl",
                "border",
                "border-text/30",
                "rounded-lg",
                // "shadow-[0_0_0_1px_rgba(0,0,0,0.1)]",
                "my-1",
                "z-10",
                "absolute",
                "top-0"
              ),
            menuList: () => classNames("py-1"),
            // menuPortal: () => classNames(),
            multiValue: () =>
              classNames("bg-transparent", "rounded-sm", "m-0.5"),
            multiValueLabel: () =>
              classNames(
                "rounded-lg",
                "text-text",
                "text-sm",
                "p-[3]",
                "pl-[6]"
              ),
            multiValueRemove: ({ isFocused }) =>
              classNames(
                "rounded-sm",
                isFocused && "bg-red-500",
                "px-1",
                "hover:bg-red-500",
                "hover:text-red-800"
              ),
            noOptionsMessage: () =>
              classNames("text-text/40", "text-sm", "py-3", "px-3"),
            option: ({ isDisabled, isFocused, isSelected }) =>
              classNames(
                "text-text/80",
                "!text-sm",
                "hover:text-text",
                "!cursor-pointer",
                "py-2",
                "px-3",
                !isDisabled &&
                  (isSelected
                    ? "active:bg-transparent"
                    : "active:bg-transparent")
              ),
            placeholder: () => classNames("text-text/40", "mx-0.5"),
            singleValue: ({ isDisabled }) =>
              classNames(isDisabled ? "text-text/60" : "text-text", "mx-0.5"),
            valueContainer: () => classNames("py-0.5", "px-2"),
          }}
          // className={`bg-transparent outline-primary hover:border-primary rounded-lg  text-sm text-text mx-2 w-28 ${className}`}
          value={value}
          onChange={(e) => setValue(e)}
          options={options}
          menuPortalTarget={document.body} // Render the menu in the body
          // menuPosition="fixed" // Fix the position of the menu
          // menuShouldBlockScroll={true} // Block scroll when menu is open
        ></Select_>
        <Helper message={helper} className="ml-2" />
      </div>
    </div>
  );
};
