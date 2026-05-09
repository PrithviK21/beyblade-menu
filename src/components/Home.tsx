import React from "react";
import { ChangeStepButton } from "./common/ChangeStepsButton";
import { STEPS } from "../constants";

function Home({ changeCurrentStep }) {
  return (
    <div>
      HOME PAGE
      <ChangeStepButton
        changeStep={changeCurrentStep}
        step={STEPS.GEN_SELECT}
      />
    </div>
  );
}

export default Home;
