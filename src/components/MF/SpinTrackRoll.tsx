import React from "react";
import { STEPS } from "../../constants";
import { useBeybladeDataContext } from "../../context/beybladeDataContext";
import RollWrapper from "../common/RollWrapper";

function SpinTrackRoll({ id, changeCurrentStep }) {
  const { partsList } = useBeybladeDataContext();

  return (
    <RollWrapper
      partLabel={"Spin Track"}
      partType={"SPIN_TRACK"}
      partList={partsList.MF.SPIN_TRACK}
      changeCurrentStep={changeCurrentStep}
      id={id}
      nextStep={STEPS.MF.PERFORMANCE_TIP}
    />
  );
}

export default SpinTrackRoll;
