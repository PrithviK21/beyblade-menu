import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import { STEPS } from "../../constants";
import RollWrapper from "../common/RollWrapper";

function FusionWheelRoll({ id, changeCurrentStep }) {
  const { partsList } = useBeybladeDataContext();

  return (
    <RollWrapper
      partLabel={"Fusion Wheel"}
      partType={"FUSION_WHEEL"}
      partList={partsList.MF.FUSION_WHEEL}
      changeCurrentStep={changeCurrentStep}
      id={id}
      nextStep={STEPS.MF.SPIN_TRACK}
    />
  );
}

export default FusionWheelRoll;
