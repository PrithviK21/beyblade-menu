import { useState } from "react";
import { STEPS, isValidStep } from "../constants";
import { useBeybladeDataContext } from "../context/beybladeDataContext";
import { ChangeStepButton } from "./common/ChangeStepsButton";
import TypeRoll from "./X/TypeRoll";
import BladeRoll from "./X/BladeRoll";
import RatchetRoll from "./X/RatchetRoll";
import BitRoll from "./X/BitRoll";
import Result from "./Result";

function StateMachine({ firstStep, id }) {
  const { partsList } = useBeybladeDataContext();
  const [currentStep, setCurrentStep] = useState(firstStep);
  const changeCurrentStep = (newStep: string) => {
    if (isValidStep(newStep, STEPS)) {
      setCurrentStep(newStep);
      console.log(newStep);
    } else {
      throw new Error(`Invalid Step ${newStep}`);
    }
  };

  // Beyblade X Logic
  if (currentStep === STEPS.X.TYPE_ROLL) {
    return <TypeRoll id={id} changeCurrentStep={changeCurrentStep} />;
  }
  if (currentStep === STEPS.X.UX.BLADE) {
    return (
      <BladeRoll id={id} type="UX" changeCurrentStep={changeCurrentStep} />
    );
  }
  if (currentStep === STEPS.X.BX.BLADE) {
    return (
      <BladeRoll id={id} type="BX" changeCurrentStep={changeCurrentStep} />
    );
  }
  if (currentStep === STEPS.X.CX.LOCK_CHIP) {
    return (
      <div>
        CX Lock chip
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.X.CX.MAIN_BLADE}
        />
      </div>
    );
  }
  if (currentStep === STEPS.X.CX.MAIN_BLADE) {
    return (
      <div>
        CX Main Blade
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.X.CX.ASSIST_BLADE}
        />
      </div>
    );
  }
  if (currentStep === STEPS.X.CX.ASSIST_BLADE) {
    return (
      <div>
        CX Assist Blade
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.X.COMMON.RATCHET}
        />
      </div>
    );
  }
  if (currentStep === STEPS.X.COMMON.RATCHET) {
    return <RatchetRoll id={id} changeCurrentStep={changeCurrentStep} />;
  }
  if (currentStep === STEPS.X.COMMON.BIT) {
    return <BitRoll id={id} changeCurrentStep={changeCurrentStep} />;
  }

  //MF Logic
  if (currentStep === STEPS.MF.ENERGY_RING) {
    return (
      <div>
        MF Energy Ring
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.MF.SPIN_TRACK}
        />
      </div>
    );
  }
  if (currentStep === STEPS.MF.FUSION_WHEEL) {
    return (
      <div>
        MF Fusion Wheel
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.MF.ENERGY_RING}
        />
      </div>
    );
  }
  if (currentStep === STEPS.MF.SPIN_TRACK) {
    return (
      <div>
        MF Spin Track
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.MF.PERFORMANCE_TIP}
        />
      </div>
    );
  }
  if (currentStep === STEPS.MF.PERFORMANCE_TIP) {
    return (
      <div>
        MF Performance Tip
        <ChangeStepButton changeStep={changeCurrentStep} step={STEPS.END} />
      </div>
    );
  }
  if (currentStep === STEPS.END) {
    return <Result id={id} />;
  }
  return null;
}

export default StateMachine;
