import { Button } from "react-daisyui";
import Link from "next/link";

function Linksn({ icon, children, isActive, href = "/" }) {
  return (
    <div
      className={`pr-3 border-r-4 my-1 rounded ${
        isActive ? "border-r-secondaryi" : "border-r-bga"
      }`}
    >
      <Link href={href}>
        <Button
          animation={false}
          variant="link"
          startIcon={icon}
          className={`${
            isActive
              ? "bg-bgai hover:bg-bgai text-text-h"
              : "bg-bga text-text-p"
          }   w-full rounded-xl flex justify-start decoration-transparent`}
        >
          {children}
        </Button>
      </Link>
    </div>
  );
}

export default Linksn;
