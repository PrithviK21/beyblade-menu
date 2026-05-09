import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import { STEPS } from "../../constants";
import RollWrapper from "../common/RollWrapper";

function EnergyRingRoll({ id, changeCurrentStep }) {
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
