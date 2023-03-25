import { Button } from "react-daisyui";
import Link from "next/link";

function Linksn({ icon, children, isActive, className, href = "/" }) {
  return (
    <div
      className={`${className} pr-3 border-r-4 my-1 rounded ${
        isActive ? "border-r-secondary" : "border-r-0"
      }`}
    >
      <Link href={href}>
        <Button
          animation={false}
          variant="link"
          startIcon={icon}
          className={`${
            isActive ? "bg-bgt hover:bg-bgt text-text-h" : "bg-bgt text-text-p"
          } w-full rounded-xl flex justify-start decoration-transparent hover:text-text-h hover:bg-bgt`}
        >
          {children}
        </Button>
      </Link>
    </div>
  );
}

export default Linksn;
