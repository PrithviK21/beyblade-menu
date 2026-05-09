import React from "react";
import {
  addPartToGeneratedBeyblade,
  useBeybladeDataContext,
} from "../../context/beybladeDataContext";
import { rollSimulator } from "../../utils/partsUtils";
import { STEPS } from "../../constants";
import { ChangeStepButton } from "../common/ChangeStepsButton";

// UX, BX, CX, CXE -> handle all here
function BladeRoll({ id, type, changeCurrentStep }) {
  const { partsList, getGeneratedBeyblade, getLatestBeybladePart, dispatch } =
    useBeybladeDataContext();

  const BX_BLADES = partsList.X.BX.BLADE;
  const UX_BLADES = partsList.X.UX.BLADE;

  const generatedBeyblade = getGeneratedBeyblade(id);
  const bladesToUse = type === "BX" ? BX_BLADES : UX_BLADES;

  const handleRoll = async () => {
    const selectedBlade = await rollSimulator(bladesToUse);
    dispatch(
      addPartToGeneratedBeyblade(id, {
        type: type + "_BLADE",
        name: selectedBlade,
      }),
    );
  };

  if (getLatestBeybladePart(id)?.type === type + "_BLADE") {
    return (
      <div className="">
        Rolled {generatedBeyblade.parts?.[0]?.name}
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.X.COMMON.RATCHET}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Available Blades</h1>
      <ol>
        {bladesToUse.map((blade) => (
          <li>{blade}</li>
        ))}
      </ol>
      <button onClick={handleRoll}>Roll for a Blade</button>
    </div>
  );
}

export default BladeRoll;
