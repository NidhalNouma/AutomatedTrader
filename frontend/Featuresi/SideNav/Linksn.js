import { Button } from "react-daisyui";
import Link from "next/link";

function Linksn({ icon, children, isActive, className, href = "/" }) {
  return (
    <div
      className={`${className} pr-0 border-r-0 my-[0.4rem] rounded ${
        isActive ? "border-r-secondary" : "border-r-0"
      }`}
    >
      <Link href={href}>
        <Button
          animation={false}
          variant="link"
          startIcon={icon}
          className={`${
            isActive
              ? "bg-bgat hover:bg-bgt text-text-h font-bold"
              : "bg-bgt text-text-p font-normal hover:text-text-h hover:bg-bgt hover:font-bold"
          } w-full rounded-xl flex justify-start decoration-transparent hover:text-text-h`}
        >
          {children}
        </Button>
      </Link>
    </div>
  );
}

export default Linksn;
