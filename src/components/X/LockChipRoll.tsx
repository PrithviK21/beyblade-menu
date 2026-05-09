import { STEPS } from "../../constants";
import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import type { RollerComponentProps } from "../../model";
import RollWrapper from "../common/RollWrapper";

function LockChipRoll({ id, changeCurrentStep }: RollerComponentProps) {
  const { partsList } = useBeybladeDataContext();

  return (
    <RollWrapper
      partLabel={"Lock Chip"}
      partType={"LOCK_CHIP"}
      partList={partsList.X.CX.LOCK_CHIP}
      changeCurrentStep={changeCurrentStep}
      id={id}
      nextStep={STEPS.X.CX.MAIN_BLADE}
    />
  );
}

export default LockChipRoll;
