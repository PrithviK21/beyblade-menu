import { useState } from "react";
import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import { getNestedValue, getRandomItem } from "../../utils/partsUtils";
import { ChangeStepButton } from "../common/ChangeStepsButton";
import { addPartToGeneratedBeyblade } from "../../context/reducer";
import type { IPart, IPartList } from "../../model";

type RollWrapperProps = {
  id: 1 | 2;
  changeCurrentStep: (step: string) => void;
  partsListPath: string;
  partType: string;
  partLabel: string;
} & (
  | { nextStep: string; nextStepCallback?: never }
  | { nextStep?: never; nextStepCallback: (part: IPart) => string }
);

export const getPartListFromConfig = (
  partsList: IPartList,
  path: string,
): string[] => {
  return getNestedValue(partsList, path) || [];
};

function RollWrapper({
  id,
  changeCurrentStep,
  partsListPath,
  partLabel,
  nextStep,
  nextStepCallback,
}: RollWrapperProps) {
  const {
    dispatch,
    getLatestBeybladePart,
    usedParts,
    partsList: PL,
  } = useBeybladeDataContext();
  const [clicked, setClicked] = useState(false);
  const handleRoll = async () => {
    setClicked(true);
    let selectedPart = getRandomItem(
      partListToUse.filter((p) => !usedParts.includes(p)),
    );
    dispatch(
      addPartToGeneratedBeyblade(id, {
        type: partLabel,
        name: selectedPart,
      }),
    );
    setClicked(false);
  };
  const latestPart = getLatestBeybladePart(id);
  if (latestPart?.type === partLabel) {
    return (
      <div className="">
        Rolled {latestPart.name}
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={
            nextStep !== undefined ? nextStep : nextStepCallback!(latestPart)
          }
        />
        {/* <button onClick={handleRoll}>Re-Roll</button> */}
      </div>
    );
  }
  let partListToUse = getPartListFromConfig(PL, partsListPath);

  return (
    <div>
      <h1>Available {partLabel}</h1>
      <ol>
        {partListToUse
          .filter((p) => !usedParts.includes(p))
          .map((part) => (
            <li>{part}</li>
          ))}
      </ol>
      <button onClick={handleRoll} disabled={clicked}>
        Roll for {partLabel}
      </button>
    </div>
  );
}

export default RollWrapper;
