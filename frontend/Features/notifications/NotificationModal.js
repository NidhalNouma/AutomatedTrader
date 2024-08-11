import moment from "moment";

import { Modal1 } from "../../components/Modal";
import { Button } from "react-daisyui";
import Link from "next/link";

import { BsFillArrowRightCircleFill } from "react-icons/bs";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../components/H";

export default function NotModal({ show, setShow }) {
  return (
    <Modal1
      open={show}
      close={() => {
        setShow(null);
      }}
    >
      <div className="">
        <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
          <div className="">
            <H3 className="flex items-center">
              {show?.title}{" "}
              {show?.link && (
                <Link href={show?.link}>
                  <BsFillArrowRightCircleFill
                    onClick={() => {
                      setShow(null);
                    }}
                    className="ml-2 h-4 w-4 text-primary cursor-pointer"
                  />
                </Link>
              )}
            </H3>
          </div>

          <Button
            size="sm"
            shape="circle"
            className=" bg-accenti"
            onClick={() => {
              setShow(null);
            }}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col justify-center items-center w-full mt-0">
          <div className="px-7 pb-7 w-full">
            <p className="text-sm text-text-p">{show?.message}</p>
            <span className="float-right mt-3 text-text-p text-xs font-light">
              {moment(show?.created_at?.toDate()).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </Modal1>
  );
}
