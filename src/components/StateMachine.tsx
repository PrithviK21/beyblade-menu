import { useState } from "react";
import { STEPS, isValidStep } from "../constants";
import TypeRoll from "./X/TypeRoll";
import BladeRoll from "./X/BladeRoll";
import RatchetRoll from "./X/RatchetRoll";
import BitRoll from "./X/BitRoll";
import Result from "./Result";
import LockChipRoll from "./X/LockChipRoll";
import MainBladeRoll from "./X/MainBladeRoll";
import AssistBladeRoll from "./X/AssistBladeRoll";
import EnergyRingRoll from "./MF/EnergyRingRoll";
import FusionWheelRoll from "./MF/FusionWheelRoll";
import SpinTrackRoll from "./MF/SpinTrackRoll";
import PerformanceTipRoll from "./MF/PerformanceTipRoll";

type StateMachineProps = {
  firstStep: string;
  id: 1 | 2;
};

function StateMachine({ firstStep, id }: StateMachineProps) {
  const [currentStep, setCurrentStep] = useState(firstStep);
  const changeCurrentStep = (newStep: string) => {
    if (isValidStep(newStep, STEPS)) {
      setCurrentStep(newStep);
      console.log(newStep);
    } else {
      throw new Error(`Invalid Step ${newStep}`);
    }
  };

  const props = { id, changeCurrentStep };

  // Beyblade X Logic
  if (currentStep === STEPS.X.TYPE_ROLL) {
    return <TypeRoll {...props} />;
  }
  if (currentStep === STEPS.X.UX.BLADE) {
    return <BladeRoll type="UX" {...props} />;
  }
  if (currentStep === STEPS.X.BX.BLADE) {
    return <BladeRoll type="BX" {...props} />;
  }
  if (currentStep === STEPS.X.CX.LOCK_CHIP) {
    return <LockChipRoll {...props} />;
  }
  if (currentStep === STEPS.X.CX.MAIN_BLADE) {
    return <MainBladeRoll {...props} />;
  }
  if (currentStep === STEPS.X.CX.ASSIST_BLADE) {
    return <AssistBladeRoll {...props} />;
  }
  if (currentStep === STEPS.X.COMMON.RATCHET) {
    return <RatchetRoll {...props} />;
  }
  if (currentStep === STEPS.X.COMMON.BIT) {
    return <BitRoll {...props} />;
  }

  //MF Logic
  if (currentStep === STEPS.MF.ENERGY_RING) {
    return <EnergyRingRoll {...props} />;
  }
  if (currentStep === STEPS.MF.FUSION_WHEEL) {
    return <FusionWheelRoll {...props} />;
  }
  if (currentStep === STEPS.MF.SPIN_TRACK) {
    return <SpinTrackRoll {...props} />;
  }
  if (currentStep === STEPS.MF.PERFORMANCE_TIP) {
    return <PerformanceTipRoll {...props} />;
  }
  if (currentStep === STEPS.END) {
    return <Result id={id} />;
  }
  return null;
}

export default StateMachine;
