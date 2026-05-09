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

export const RATCHET_INTEGRATED_BITS = ["Tr"];
