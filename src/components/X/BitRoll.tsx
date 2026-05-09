import { STEPS } from "../../constants";
import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import type { RollerComponentProps } from "../../model";
import RollWrapper from "../common/RollWrapper";

function BitRoll({ id, changeCurrentStep }: RollerComponentProps) {
  const { partsList } = useBeybladeDataContext();

  return (
    <RollWrapper
      partLabel={"Bit"}
      partType={"BIT"}
      partList={partsList.X.COMMON.BIT}
      changeCurrentStep={changeCurrentStep}
      id={id}
      nextStep={STEPS.END}
    />
  );
}

export default BitRoll;
