import { STEPS } from "../../constants";
import {
  useBeybladeDataContext,
  addPartToGeneratedBeyblade,
} from "../../context/beybladeDataContext";
import { rollSimulator } from "../../utils/partsUtils";
import { ChangeStepButton } from "../common/ChangeStepsButton";
import type { RollerComponentProps } from "../../model";

// If Ratchet Integrated Bit, skip bit step
function RatchetRoll({ id, changeCurrentStep }: RollerComponentProps) {
  const { partsList, dispatch, getLatestBeybladePart } =
    useBeybladeDataContext();

  const ratchets = partsList.X.COMMON.RATCHET;

  const handleRoll = async () => {
    const selectedRatchet = await rollSimulator(ratchets);
    dispatch(
      addPartToGeneratedBeyblade(id, {
        type: "RATCHET",
        name: selectedRatchet,
      }),
    );
  };
  const latestPart = getLatestBeybladePart(id);
  if (latestPart?.type === "RATCHET") {
    // TODO: Add a check for Ratchet Integrated Bits, move to end if found
    return (
      <div className="">
        Rolled {latestPart.name}
        <ChangeStepButton
          changeStep={changeCurrentStep}
          // TODO: Add a check for Ratchet Integrated Bits, move to end if found
          step={latestPart.name === "Tr" ? STEPS.END : STEPS.X.COMMON.BIT}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Available Ratchets</h1>
      <ol>
        {ratchets.map((ratchet) => (
          <li>{ratchet}</li>
        ))}
      </ol>
      <button onClick={handleRoll}>Roll for a Ratchet</button>
    </div>
  );
}

export default RatchetRoll;
