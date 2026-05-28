import { ChangeStepButton } from "../common/ChangeStepsButton";
import { rollSimulator } from "../../utils/partsUtils";
import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import type { RollerComponentProps } from "../../model";
import { addTypeToGeneratedBeyblade } from "../../context/reducer";
import { stepMap } from "../../constants";

const lines = ["UX", "BX", "CX"];

function TypeRoll({ id, changeCurrentStep }: RollerComponentProps) {
  const { getGeneratedBeyblade, dispatch } = useBeybladeDataContext();

  const generatedBeyblade = getGeneratedBeyblade(id);

  const handleRoll = async () => {
    const line = await rollSimulator(lines);
    dispatch(addTypeToGeneratedBeyblade(id, line));
  };

  if (generatedBeyblade.type) {
    return (
      <div>
        Rolled a {generatedBeyblade.type}
        <ChangeStepButton
          step={stepMap[generatedBeyblade.type]}
          changeStep={changeCurrentStep}
        />
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleRoll}>Click to Roll</button>
    </div>
  );
}

export default TypeRoll;
