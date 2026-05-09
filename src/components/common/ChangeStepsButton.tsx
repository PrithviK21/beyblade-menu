export const ChangeStepButton = ({
  step,
  changeStep,
  overrideText = "",
}: {
  step: string;
  changeStep: (step: string) => void;
  overrideText?: string;
}) => {
  return (
    <button onClick={() => changeStep(step)}>{overrideText || step}</button>
  );
};
