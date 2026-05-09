import { useState } from "react";
import "./App.css";
import { useBeybladeDataContext } from "./context/beybladeDataContext";
import Home from "./components/Home";
import GenSelect from "./components/GenSelect";
import TypeRoll from "./components/X/TypeRoll";
import { ChangeStepButton } from "./components/common/ChangeStepsButton";
import { isValidStep, STEPS } from "./constants";

/**
 * What is my vision?
 *
 * Basically a UI for spillsbey's roll for bey.
 * You just have to roll a bunch of dice and get results
 * 1. Choose gen - X or MF
 * 2. Split into wizards based on choice
 * 3. Wizard for X
 *    a. Roll for type (CX, BX, UX) for first bey and second bey
 *    b. Based on type, resolve each beyblade separately based on dice rolls
 *    c. Show both resulting beyblade parts
 *    Wizard for MF
 *    a. Roll for each part for each bey individually. Keep a list of incompatible parts like L-Drago
 *    c. Show both resulting beyblade parts
 * 4. Thats it for now
 *
 * Workflow
 * 1. Parse the CSV. This is just for me so i'm using my own dataset.
 * 2. Save the entire sheet in memory. Not many rows, 30-50 max.
 * 3. Based on gen choice, filter the sheet and generate part lists
 * 4. Dynamically create wizard based on gen choice
 * 5. Create randomizer util
 */

function App() {
  const { partsList } = useBeybladeDataContext();
  const [currentStep, setCurrentStep] = useState(STEPS.X.TYPE_ROLL);
  const changeCurrentStep = (newStep: string) => {
    if (isValidStep(newStep, STEPS)) {
      setCurrentStep(newStep);
      console.log(newStep);
    } else {
      throw new Error(`Invalid Step ${newStep}`);
    }
  };

  if (currentStep === STEPS.HOME) {
    return <Home changeCurrentStep={changeCurrentStep} />;
  }
  if (currentStep === STEPS.GEN_SELECT) {
    return <GenSelect changeCurrentStep={changeCurrentStep} />;
  }
  // Beyblade X Logic
  if (currentStep === STEPS.X.TYPE_ROLL) {
    return <TypeRoll changeCurrentStep={changeCurrentStep} />;
  }
  if (currentStep === STEPS.X.UX.BLADE) {
    return (
      <div>
        UX blade
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.X.COMMON.RATCHET}
        />
      </div>
    );
  }
  if (currentStep === STEPS.X.BX.BLADE) {
    return (
      <div>
        BX blade
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.X.COMMON.RATCHET}
        />
      </div>
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
    return (
      <div>
        Ratchet
        <ChangeStepButton
          changeStep={changeCurrentStep}
          step={STEPS.X.COMMON.BIT}
        />
      </div>
    );
  }
  if (currentStep === STEPS.X.COMMON.BIT) {
    return (
      <div>
        Bit - skipped if ratchet integrated bit is rolled
        <ChangeStepButton changeStep={changeCurrentStep} step={STEPS.END} />
      </div>
    );
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
  return (
    <div>
      Ollo
      <ChangeStepButton
        changeStep={changeCurrentStep}
        step={STEPS.HOME}
        overrideText="Restart"
      />
    </div>
  );
}

export default App;
