import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import { STEPS } from "../../constants";
import RollWrapper from "../common/RollWrapper";
import type { RollerComponentProps } from "../../model";

function FusionWheelRoll({ id, changeCurrentStep }: RollerComponentProps) {
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
