import { STEPS } from "../../constants";
import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import RollWrapper from "../common/RollWrapper";

function AssistBladeRoll({ id, changeCurrentStep }) {
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
