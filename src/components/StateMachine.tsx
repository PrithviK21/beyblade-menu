import { useState } from "react";
import {
  STEPS,
  isValidStep,
  rollRegistry,
  stateMachineRegistry,
} from "../constants";
import type { IPartList } from "../model";
import { getNestedValue } from "../utils/partsUtils";

type StateMachineProps = {
  firstStep: string;
  id: 1 | 2;
};

export const getPartListFromConfig = (
  partsList: IPartList,
  config: any,
): string[] => {
  return getNestedValue(partsList, config.partListPath) || [];
};
function StateMachine({ firstStep, id }: StateMachineProps) {
  const [currentStep, setCurrentStep] = useState(firstStep);
  const changeCurrentStep = (newStep: string) => {
    if (isValidStep(newStep, STEPS)) {
      setCurrentStep(newStep);
    } else {
      throw new Error(`Invalid Step ${newStep}`);
    }
  };

  const props = { id, changeCurrentStep };
  const CurrentStepComponent = stateMachineRegistry[currentStep];
  return <CurrentStepComponent {...props} {...rollRegistry[currentStep]} />;
}

export default StateMachine;
