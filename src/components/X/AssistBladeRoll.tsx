import { STEPS } from "../../constants";
import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import type { RollerComponentProps } from "../../model";
import RollWrapper from "../common/RollWrapper";

function AssistBladeRoll({ id, changeCurrentStep }: RollerComponentProps) {
  const { partsList } = useBeybladeDataContext();

  return (
    <RollWrapper
      partLabel={"Assist Blade"}
      partType={"ASSIST_BLADE"}
      partList={partsList.X.CX.ASSIST_BLADE}
      changeCurrentStep={changeCurrentStep}
      id={id}
      nextStep={STEPS.X.COMMON.RATCHET}
    />
  );
}

export default AssistBladeRoll;
