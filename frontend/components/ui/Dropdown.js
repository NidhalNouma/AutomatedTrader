import { Dropdown as Dropdown_ } from "react-daisyui";
import { Fragment } from "react";

export const Dropdown = ({ children, content, className }) => {
  return (
    <Fragment>
      <Dropdown_ vertical="end">
        {children}

        <Dropdown_.Menu
          className={`bg-bg/80 backdrop-blur-xl shadow-2xl shadow-bgt min-w-[12rem] ${className}`}
        >
          {content}
        </Dropdown_.Menu>
      </Dropdown_>
    </Fragment>
  );
};

export function DropdownButton({ onClick, className, children }) {
  return (
    <Dropdown_.Item
      onClick={onClick}
      className={`text-text/80 hover:text-primary bg-transparent text-sm font-semibold ${className}`}
    >
      <span>{children}</span>
    </Dropdown_.Item>
  );
}
