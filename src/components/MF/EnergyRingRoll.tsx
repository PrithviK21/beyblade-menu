import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import { STEPS } from "../../constants";
import RollWrapper from "../common/RollWrapper";
import type { RollerComponentProps } from "../../model";

function EnergyRingRoll({ id, changeCurrentStep }: RollerComponentProps) {
  const { partsList } = useBeybladeDataContext();

  return (
    <RollWrapper
      partLabel={"Energy Ring"}
      partType={"ENERGY_RING"}
      partList={partsList.MF.ENERGY_RING}
      changeCurrentStep={changeCurrentStep}
      id={id}
      nextStep={STEPS.MF.FUSION_WHEEL}
    />
  );
}

export default EnergyRingRoll;
