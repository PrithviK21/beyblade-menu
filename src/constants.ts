import RollWrapper from "./components/common/PartRollWrapper";
import Result from "./components/Result";
import TypeRoll from "./components/X/TypeRoll";
import type { IPart } from "./model";

export const STEPS = {
  HOME: "Home",
  GEN_SELECT: "Select Your Generation",
  X: {
    TYPE_ROLL: "Roll for Type",
    CX: {
      LOCK_CHIP: "Lock Chip",
      MAIN_BLADE: "Main Blade",
      ASSIST_BLADE: "Assist Blade",
      OVER_BLADE: "Over Blade",
      METAL_BLADE: "Metal Blade",
    },
    UX: {
      BLADE: "UX Blade",
    },
    BX: {
      BLADE: "BX Blade",
    },
    COMMON: {
      RATCHET: "Ratchet",
      BIT: "Bit",
    },
  },
  MF: {
    FUSION_WHEEL: "Fusion Wheel",
    ENERGY_RING: "Energy Ring",
    SPIN_TRACK: "Spin Track",
    PERFORMANCE_TIP: "Performance Tip",
  },
  END: "End",
};

export const isValidStep = (step: string, allowedSteps: any) => {
  for (var existingstep of Object.values(allowedSteps)) {
    if (typeof existingstep === "object") {
      if (isValidStep(step, existingstep)) return true;
    } else if (step === existingstep) return true;
  }
  return false;
};

export const RATCHET_INTEGRATED_BITS = ["Tr", "Turbo"];
export const MF_4D_TIPS = ["F:D", "B:D", "F:S"];
export const stepMap: Record<string, string> = {
  UX: STEPS.X.UX.BLADE,
  BX: STEPS.X.BX.BLADE,
  CX: STEPS.X.CX.LOCK_CHIP,
};
//REGISTRIES

export const stateMachineRegistry = {
  [STEPS.X.TYPE_ROLL]: TypeRoll,
  [STEPS.X.BX.BLADE]: RollWrapper,
  [STEPS.X.UX.BLADE]: RollWrapper,
  [STEPS.X.CX.LOCK_CHIP]: RollWrapper,
  [STEPS.X.CX.ASSIST_BLADE]: RollWrapper,
  [STEPS.X.CX.MAIN_BLADE]: RollWrapper,
  [STEPS.X.COMMON.BIT]: RollWrapper,
  [STEPS.X.COMMON.RATCHET]: RollWrapper,
  [STEPS.MF.ENERGY_RING]: RollWrapper,
  [STEPS.MF.FUSION_WHEEL]: RollWrapper,
  [STEPS.MF.SPIN_TRACK]: RollWrapper,
  [STEPS.MF.PERFORMANCE_TIP]: RollWrapper,
  [STEPS.END]: Result,
};

export const rollRegistry = {
  [STEPS.X.BX.BLADE]: {
    partLabel: "BX Blade",
    partType: "BX_BLADE",
    partsListPath: "X.BX.BLADE",
    nextStep: STEPS.X.COMMON.RATCHET,
  },
  [STEPS.X.UX.BLADE]: {
    partLabel: "UX Blade",
    partType: "UX_BLADE",
    partsListPath: "X.UX.BLADE",
    nextStep: STEPS.X.COMMON.RATCHET,
  },
  [STEPS.X.CX.LOCK_CHIP]: {
    partLabel: "Lock Chip",
    partType: "LOCK_CHIP",
    partsListPath: "X.CX.LOCK_CHIP",
    nextStep: STEPS.X.CX.MAIN_BLADE,
  },
  [STEPS.X.CX.MAIN_BLADE]: {
    partLabel: "Main Blade",
    partType: "MAIN_BLADE",
    partsListPath: "X.CX.MAIN_BLADE",
    nextStep: STEPS.X.CX.ASSIST_BLADE,
  },
  [STEPS.X.CX.ASSIST_BLADE]: {
    partLabel: "Assist Blade",
    partType: "ASSIST_BLADE",
    partsListPath: "X.CX.ASSIST_BLADE",
    nextStep: STEPS.X.COMMON.RATCHET,
  },
  [STEPS.X.COMMON.RATCHET]: {
    partLabel: "Ratchet",
    partType: "RATCHET",
    partsListPath: "X.COMMON.RATCHET",
    nextStepCallback: (part: IPart) =>
      RATCHET_INTEGRATED_BITS.includes(part.name)
        ? STEPS.END
        : STEPS.X.COMMON.BIT,
  },
  [STEPS.X.COMMON.BIT]: {
    partLabel: "Bit",
    partType: "BIT",
    partsListPath: "X.COMMON.BIT",
    nextStep: STEPS.END,
  },
  [STEPS.MF.ENERGY_RING]: {
    partLabel: "Energy Ring",
    partType: "ENERGY_RING",
    partsListPath: "MF.ENERGY_RING",
    nextStep: STEPS.MF.FUSION_WHEEL,
  },
  [STEPS.MF.FUSION_WHEEL]: {
    partLabel: "Fusion Wheel",
    partType: "FUSION_WHEEL",
    partsListPath: "MF.FUSION_WHEEL",
    nextStep: STEPS.MF.SPIN_TRACK,
  },
  [STEPS.MF.SPIN_TRACK]: {
    partLabel: "Spin Track",
    partType: "SPIN_TRACK",
    partsListPath: "MF.SPIN_TRACK",
    nextStepCallback: (part: IPart) =>
      MF_4D_TIPS.includes(part.name) ? STEPS.END : STEPS.MF.PERFORMANCE_TIP,
  },
  [STEPS.MF.PERFORMANCE_TIP]: {
    partLabel: "Performance Tip",
    partType: "PERFORMANCE_TIP",
    partsListPath: "MF.PERFORMANCE_TIP",
    nextStep: STEPS.END,
  },
};
