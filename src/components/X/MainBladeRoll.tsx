import { STEPS } from "../../constants";
import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import RollWrapper from "../common/RollWrapper";

function MainBladeRoll({ id, changeCurrentStep }) {
  const { partsList } = useBeybladeDataContext();

  return (
    <RollWrapper
      partLabel={"Main Blade"}
      partType={"MAIN_BLADE"}
      partList={partsList.X.CX.MAIN_BLADE}
      changeCurrentStep={changeCurrentStep}
      id={id}
      nextStep={STEPS.X.CX.ASSIST_BLADE}
    />
  );
}

export default MainBladeRoll;
