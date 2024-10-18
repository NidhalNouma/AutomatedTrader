import React, { Fragment } from "react";
import { ButtonP, ButtonFile } from "../../components/Button";
import { Input1 } from "../../components/Input";
import { NewTicket } from "../../hooks/SupportTicket";

function AnswerMessage({ id, getTicket }) {
  const { message, setMessage, file, setFile, send } = NewTicket(true, false);
  return (
    <div className="w-full flex">
      <div className="grow">
        <Input1
          classNameInput="bg-accenti"
          className="!max-w-full"
          // name="Message"
          placeholder={"Reply ..."}
          // helper="Name of the webhook"
          value={message}
          setValue={setMessage}
          isTextArea={true}
        />
        <div className=" mt-2 flex w-full items-center">
          {file && <span className="text-xs">{file.name}</span>}
          <ButtonFile
            onSelect={(e) => setFile(e.target.files[0])}
            className="!text-primary ml-auto"
          >
            Attatch a file
          </ButtonFile>
        </div>
      </div>

      <div className="mt-4 mb-5 mx-5 flex justify-center">
        <ButtonP
          onClick={async () => {
            const r = await send(id);
            if (r) {
              await getTicket();
              setMessage("");
            }
            close();
          }}
          className="w-full max-w-xs mx-auto"
        >
          Send
        </ButtonP>
      </div>
    </div>
  );
}

export default AnswerMessage;
