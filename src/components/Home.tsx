import { ChangeStepButton } from "./common/ChangeStepsButton";
import { STEPS } from "../constants";
import type { ChangeCurrentStepFunc } from "../model";

function Home({
  changeCurrentStep,
}: {
  changeCurrentStep: ChangeCurrentStepFunc;
}) {
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
