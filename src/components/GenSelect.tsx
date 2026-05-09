import React from "react";
import { ChangeStepButton } from "./common/ChangeStepsButton";
import { STEPS } from "../constants";

function GenSelect({ changeCurrentStep }) {
  return (
    <div>
      Select your Generation
      <ChangeStepButton
        changeStep={changeCurrentStep}
        step={STEPS.X.TYPE_ROLL}
        overrideText={"Beyblade X"}
      />
      <ChangeStepButton
        changeStep={changeCurrentStep}
        step={STEPS.MF.FUSION_WHEEL}
        overrideText={"Metal Saga"}
      />
    </div>
  );
}

export default GenSelect;
