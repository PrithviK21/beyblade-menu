import {
  useBeybladeDataContext,
  addPartToGeneratedBeyblade,
} from "../../context/beybladeDataContext";
import { rollSimulator } from "../../utils/partsUtils";
import { ChangeStepButton } from "../common/ChangeStepsButton";

type RollWrapperProps = {
  id: 1 | 2;
  changeCurrentStep: (step: string) => void;
  partList: string[];
  partType: string;
  partLabel: string;
  nextStep: string;
};

function RollWrapper({
  id,
  changeCurrentStep,
  partList,
  partType,
  partLabel,
  nextStep,
}: RollWrapperProps) {
  const { dispatch, getLatestBeybladePart } = useBeybladeDataContext();

  const handleRoll = async () => {
    const selectedBit = await rollSimulator(partList);
    dispatch(
      addPartToGeneratedBeyblade(id, {
        type: partType,
        name: selectedBit,
      }),
    );
  };
  const latestPart = getLatestBeybladePart(id);
  if (latestPart?.type === partType) {
    return (
      <div className="">
        Rolled {latestPart.name}
        <ChangeStepButton changeStep={changeCurrentStep} step={nextStep} />
        <button onClick={handleRoll}>Re-Roll</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Available {partLabel}</h1>
      <ol>
        {partList.map((part) => (
          <li>{part}</li>
        ))}
      </ol>
      <button onClick={handleRoll}>Roll for {partLabel}</button>
    </div>
  );
}

export default RollWrapper;
