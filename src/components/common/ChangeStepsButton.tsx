type ChangeStepsButtonProps = {
  step: string;
  changeStep: (step: string) => void;
  overrideText?: string;
};

export const ChangeStepButton = ({
  step,
  changeStep,
  overrideText = "",
}: ChangeStepsButtonProps) => {
  return (
    <button onClick={() => changeStep(step)}>{overrideText || step}</button>
  );
};
