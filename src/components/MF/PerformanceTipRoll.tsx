import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import { STEPS } from "../../constants";
import RollWrapper from "../common/RollWrapper";

function PerformanceTipRoll({ id, changeCurrentStep }) {
  const { partsList } = useBeybladeDataContext();

  return (
    <RollWrapper
      partLabel={"Performance Tip"}
      partType={"PERFORMANCE_TIP"}
      partList={partsList.MF.PERFORMANCE_TIP}
      changeCurrentStep={changeCurrentStep}
      id={id}
      nextStep={STEPS.END}
    />
  );
}

export default PerformanceTipRoll;
