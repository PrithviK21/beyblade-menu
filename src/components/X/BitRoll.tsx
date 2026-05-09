import React from "react";
import { STEPS } from "../../constants";
import {
  useBeybladeDataContext,
  addPartToGeneratedBeyblade,
} from "../../context/beybladeDataContext";
import { rollSimulator } from "../../utils/partsUtils";
import { ChangeStepButton } from "../common/ChangeStepsButton";

function BitRoll({ id, changeCurrentStep }) {
  const { partsList, dispatch, getLatestBeybladePart } =
    useBeybladeDataContext();

  const bits = partsList.X.COMMON.BIT;

  const handleRoll = async () => {
    const selectedBit = await rollSimulator(bits);
    dispatch(
      addPartToGeneratedBeyblade(id, {
        type: "BIT",
        name: selectedBit,
      }),
    );
  };
  const latestPart = getLatestBeybladePart(id);
  if (latestPart?.type === "BIT") {
    return (
      <div className="">
        Rolled {latestPart.name}
        <ChangeStepButton changeStep={changeCurrentStep} step={STEPS.END} />
      </div>
    );
  }

  return (
    <div>
      <h1>Available Bits</h1>
      <ol>
        {bits.map((bit) => (
          <li>{bit}</li>
        ))}
      </ol>
      <button onClick={handleRoll}>Roll for a Bit</button>
    </div>
  );
}

export default BitRoll;
