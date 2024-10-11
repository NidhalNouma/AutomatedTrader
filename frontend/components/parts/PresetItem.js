import { Fragment, useState, useEffect } from "react";
import { Label, Par } from "../ui/Text";
import { Dropdown, DropdownButton } from "../ui/Dropdown";
import { ColorPicker } from "../ui/ColorPicker";
import { DeleteModal, EditModal, Modal } from "../ui/Modal";

import PresetForm from "../Forms/Preset";

import { addAlpha } from "../../utils/functions";

import { EditPresetColor, DeletePreset } from "../../hooksp/PresetHook";

export default function PresetItem({ preset }) {
  const [openDel, setOpenDel] = useState(false);
  const [openChangeData, setOpenChangeData] = useState(false);
  const [openChangeColor, setOpenChangeColor] = useState(false);

  const { presetColor, setPresetColor, editPresetColor } =
    EditPresetColor(preset);
  const { deletePreset } = DeletePreset(preset);

  return (
    <Fragment>
      <Modal
        open={openChangeData}
        close={() => setOpenChangeData(false)}
        withHeader={true}
        title={"Edit preset"}
      >
        <PresetForm preset={preset} close={() => setOpenChangeData(false)} />
      </Modal>
      <EditModal
        open={openChangeColor}
        close={() => setOpenChangeColor(false)}
        withHeader={true}
        title="Preset color"
        onSave={async () => {
          const r = await editPresetColor();
          if (r) setOpenChangeColor(false);
        }}
      >
        <ColorPicker
          className="max-w-xs mb-4"
          color={presetColor}
          setColor={setPresetColor}
        />
      </EditModal>

      <DeleteModal
        className=""
        title="Delete Preset"
        withHeader={true}
        open={openDel}
        close={() => {
          setOpenDel(false);
        }}
        backclose={() => {
          setOpenDel(false);
        }}
        onDelete={async () => {
          const r = await deletePreset();
          return r;
        }}
      >
        <Par className="mx-auto max-w-xs text-sm text-center mb-4">
          Are you sure you want to delete this preset, all your data will be
          lost!
        </Par>
      </DeleteModal>

      <article
        style={{
          outlineColor: addAlpha(preset.color, 0.3),
          backgroundColor: addAlpha(preset.color, 0.06),
        }}
        className="w-full rounded outline outline-offset-2 outline-dashed outline-1 p-2.5"
      >
        <div className="flex items-start justify-between">
          <div className="">
            <Label className="">{preset.name}</Label>
          </div>

          <Dropdown
            content={
              <Fragment>
                <DropdownButton onClick={() => setOpenChangeData(true)}>
                  Edit
                </DropdownButton>
                <DropdownButton onClick={() => setOpenChangeColor(true)}>
                  Change color
                </DropdownButton>
                <DropdownButton onClick={() => setOpenDel(true)}>
                  Delete
                </DropdownButton>
              </Fragment>
            }
            className="w-40 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 cursor-pointer text-text/40 ml-1 -mr-1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </Dropdown>
        </div>

        <h6 className="text-text/80 text-xs mt-2">
          Symbol:{" "}
          <span className={`${"text-text bg-text/10"} rounded px-1`}>
            {preset.data?.pair || "All"}
          </span>
        </h6>
        <div className="mt-2 flex items-center justify-between">
          <h6 className="text-text/80 text-xs">
            Type:{" "}
            <span
              className={`${
                preset.data?.type.label == "Buy"
                  ? "text-long bg-long/10"
                  : preset.data?.type.label == "Sell"
                  ? "text-short bg-short/10"
                  : "text-text bg-text/10"
              } rounded px-1`}
            >
              {preset.data?.type.label}
            </span>
          </h6>
          {preset.type == 0 && (
            <h6 className="text-text/80 text-xs ">
              Risk:{" "}
              <span className={`${"text-text bg-text/10"} rounded px-1`}>
                {preset.data?.positionValuePercentage ||
                  preset.data?.positionValue}
                {preset.data?.positionValuePercentage && "%"}
              </span>
            </h6>
          )}
          {preset.type == 3 && (
            <h6 className="text-text/80 text-xs ">
              StopLoss:{" "}
              <span
                className={`${
                  preset.data?.stopLoss
                    ? "text-loss bg-loss/10"
                    : "text-text bg-text/10"
                } rounded px-1`}
              >
                {preset.data?.stopLoss || "NA"}
              </span>
            </h6>
          )}
          <div />
        </div>

        {preset.type == 0 && (
          <div className="mt-2 flex items-center justify-between">
            <h6 className="text-text/80 text-xs">
              StopLoss:{" "}
              <span
                className={`${
                  preset.data?.stopLoss
                    ? "text-loss bg-loss/10"
                    : "text-text bg-text/10"
                } rounded px-1`}
              >
                {preset.data?.stopLoss || "NA"}
              </span>
            </h6>

            <h6 className="text-text/80 text-xs">
              TakeProfit:{" "}
              <span
                className={`${
                  preset.data?.takeProfit
                    ? "text-profit bg-profit/10"
                    : "text-text bg-text/10"
                } rounded px-1`}
              >
                {preset.data?.takeProfit || "NA"}
              </span>
            </h6>
            <div />
          </div>
        )}
        {preset.type == 2 && (
          <div className="mt-2 flex items-center justify-between">
            <h6 className="text-text/80 text-xs">
              Partial Close:{" "}
              <span
                className={`${
                  preset.data?.partialCloseValue
                    ? "text-profit bg-profit/10"
                    : "text-text bg-text/10"
                } rounded px-1`}
              >
                {preset.data?.partialCloseValue + "%" || "NA"}
              </span>
            </h6>

            <h6 className="text-text/80 text-xs">
              Move BE:{" "}
              <span
                className={`${
                  preset.data?.moveToBE
                    ? "text-profit bg-profit/10"
                    : "text-text bg-text/10"
                } rounded px-1`}
              >
                {preset.data?.moveToBE ? "Activate" : "NA"}
              </span>
            </h6>
            <div />
          </div>
        )}
      </article>
    </Fragment>
  );
}
