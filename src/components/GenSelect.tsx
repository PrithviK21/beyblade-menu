import { ChangeStepButton } from "./common/ChangeStepsButton";
import { STEPS } from "../constants";
import type { ChangeCurrentStepFunc } from "../model";
import { generateMFCombo, generateXCombo } from "../utils/partsUtils";
import { useBeybladeDataContext } from "../context/beybladeDataContext";
import { setGeneratedBeyblade } from "../context/reducer";

function GenSelect({
  changeCurrentStep,
}: {
  changeCurrentStep: ChangeCurrentStepFunc;
}) {
  const { dispatch, partsList } = useBeybladeDataContext();

  const handleXClick = () => {
    const randomBeyblade1 = generateXCombo(partsList);
    const randomBeyblade2 = generateXCombo(partsList);
    dispatch(setGeneratedBeyblade(1, randomBeyblade1));
    dispatch(setGeneratedBeyblade(2, randomBeyblade2));
    changeCurrentStep("instant");
  };
  const handleMFClick = () => {
    const randomBeyblade1 = generateMFCombo(partsList);
    const randomBeyblade2 = generateMFCombo(partsList);
    dispatch(setGeneratedBeyblade(1, randomBeyblade1));
    dispatch(setGeneratedBeyblade(2, randomBeyblade2));
    changeCurrentStep("instant");
  };

  return (
    <div>
      <div className="">
        <h1>Select your Generation</h1>
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.X.TYPE_ROLL}
          overrideText={"Beyblade X"}
        />
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.MF.ENERGY_RING}
          overrideText={"Metal Saga"}
        />
      </div>
      <div>
        <h2>OR instantly generate two combos</h2>
        <button onClick={handleXClick}>Generate for Beyblade X</button>
        <button onClick={handleMFClick}>Generate for Metal Saga</button>
      </div>
    </div>
  );
}

export default GenSelect;
