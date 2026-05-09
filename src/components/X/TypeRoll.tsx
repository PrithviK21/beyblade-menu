import React, { useState } from "react";
import { ChangeStepButton } from "../common/ChangeStepsButton";
import { getRandomItem, rollSimulator } from "../../utils/partsUtils";
import { STEPS } from "../../constants";

const lines = ["UX", "BX", "CX"];
const stepMap: Record<string, string> = {
  UX: STEPS.X.UX.BLADE,
  BX: STEPS.X.BX.BLADE,
  CX: STEPS.X.CX.LOCK_CHIP,
};

function TypeRoll({ changeCurrentStep }) {
  const [type, setType] = useState<string | null>(null);

  const handleRoll = () => {
    const line = getRandomItem(lines);
    setType(line);
  };

  if (type) {
    return (
      <div>
        Rolled a {type}
        <ChangeStepButton step={stepMap[type]} changeStep={changeCurrentStep} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleRoll}>Click to Roll</button>
    </div>
  );
}

export default TypeRoll;
