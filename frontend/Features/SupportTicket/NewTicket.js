import React from "react";
import { H3 } from "../../components/H";
import { Button } from "react-daisyui";
import { XIcon } from "@heroicons/react/outline";
import { ModalBig1, Modal1 } from "../../components/Modal";

import { ButtonP, ButtonFile } from "../../components/Button";
import { Input1 } from "../../components/Input";

import { NewTicket } from "../../hooks/SupportTicket";

function New({ open, close, userId, getTickets }) {
  const { subject, setSubject, message, setMessage, file, setFile, send } =
    NewTicket(open);

  return (
    <Modal1 open={open}>
      <div className="w-full">
        <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
          <H3 className="flex">New ticket</H3>
          <Button
            size="sm"
            shape="circle"
            className=" bg-accenti"
            onClick={() => {
              close();
            }}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center mt-0 ">
          <Input1
            classNameInput="bg-accenti "
            name="Subject"
            placeholder={"Subject ..."}
            // helper="Name of the webhook"
            value={subject}
            setValue={setSubject}
          />
          <Input1
            classNameInput="bg-accenti "
            name="Message"
            placeholder={"Message ..."}
            // helper="Name of the webhook"
            value={message}
            setValue={setMessage}
            isTextArea={true}
          />

          <div className="max-w-xs mt-2 flex w-full items-center">
            {file && <span className="text-xs">{file.name}</span>}
            <ButtonFile
              onSelect={(e) => setFile(e.target.files[0])}
              className="!text-primary ml-auto"
            >
              Attatch a file
            </ButtonFile>
          </div>

          <div className="mt-4 mb-5 w-full flex justify-center">
            <ButtonP
              onClick={async () => {
                const r = await send(userId);
                if (r) await getTickets();
                close();
              }}
              className="w-full max-w-xs mx-auto"
            >
              Send
            </ButtonP>
          </div>
        </div>
      </div>
    </Modal1>
  );
}

export default New;
