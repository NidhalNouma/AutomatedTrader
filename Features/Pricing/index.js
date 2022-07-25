import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";

function Index({ title }) {
  return (
    <div className="lg:w-1/3 md:w-1/2 w-full p-4 ">
      <div className="p-8 rounded-xl border border-gray-20">
        <h4> {title} </h4>
        <h5 className="text-5xl font-bold py-2 text-gray-500">
          {" "}
          $9.99<small className="text-lg">/mo</small>
        </h5>
        <hr />
        <div className="my-4 flex flex-col text-base items-center">
          <p className="flex items-center w-full my-1">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            This feature and that stuff{" "}
          </p>
          <p className="flex items-center w-full my-1">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            This feature and that stuff{" "}
          </p>
          <p className="flex items-center w-full my-1">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            This feature and that stuff{" "}
          </p>
          <p className="flex items-center w-full my-1">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            This feature and that stuff{" "}
          </p>
        </div>
        <button className="my-4 px-4 py-2 block w-full text-white bg-blue-500 hover:bg-blue-700 rounded">
          {" "}
          Select{" "}
        </button>
      </div>
    </div>
  );
}

export default Index;
