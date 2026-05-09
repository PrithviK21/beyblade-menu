import { STEPS } from "../../constants";
import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import RollWrapper from "../common/RollWrapper";

// UX, BX, CX, CXE -> handle all here
function BladeRoll({ id, type, changeCurrentStep }) {
  const { partsList } = useBeybladeDataContext();
  const BX_BLADES = partsList.X.BX.BLADE;
  const UX_BLADES = partsList.X.UX.BLADE;
  const bladesToUse = type === "BX" ? BX_BLADES : UX_BLADES;

  return (
    <RollWrapper
      id={id}
      changeCurrentStep={changeCurrentStep}
      partLabel={type + " Blade"}
      partType={type + "_BLADE"}
      partList={bladesToUse}
      nextStep={STEPS.X.COMMON.RATCHET}
    />
  );
}

export default BladeRoll;
