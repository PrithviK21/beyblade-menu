// FIXME: Fails for Pegasus 145 RF

import { remap } from "../beybladeParser";
import { MF_4D_TIPS, RATCHET_INTEGRATED_BITS } from "../constants";
import type {
  IBeybladeData,
  IPartList,
  IBeyblade,
  BeyParts,
  IGeneratedBeyblade,
} from "../model";

// TODO: Remove duplicates and undefined values
const generatePartList = (beyblades: IBeybladeData) => {
  let partList: IPartList = {
    X: {
      CX: {
        LOCK_CHIP: [],
        MAIN_BLADE: [],
        ASSIST_BLADE: [],
      },
      CXE: {
        METAL_BLADE: [],
        OVER_BLADE: [],
      },
      BX: {
        BLADE: [],
      },
      UX: {
        BLADE: [],
      },
      COMMON: {
        RATCHET: [],
        BIT: [],
      },
    },
    MF: {
      FUSION_WHEEL: [],
      ENERGY_RING: [],
      SPIN_TRACK: [],
      PERFORMANCE_TIP: [],
    },
  };
  for (var bey of beyblades) {
    try {
      const parts = extractParts(bey);
      if (parts.type === "MF") {
        pushIfNotPresent(parts.fusionWheel, partList.MF.FUSION_WHEEL);
        pushIfNotPresent(parts.energyRing, partList.MF.ENERGY_RING);
        pushIfNotPresent(parts.spinTrack, partList.MF.SPIN_TRACK);
        pushIfNotPresent(parts.performanceTip, partList.MF.PERFORMANCE_TIP);
        continue;
      } else if (parts.type === "BX") {
        pushIfNotPresent(parts.blade, partList.X.BX.BLADE);
      } else if (parts.type === "UX") {
        pushIfNotPresent(parts.blade, partList.X.UX.BLADE);
      } else if (parts.type === "CX") {
        pushIfNotPresent(parts.lockChip, partList.X.CX.LOCK_CHIP);
        pushIfNotPresent(parts.mainBlade, partList.X.CX.MAIN_BLADE);
        pushIfNotPresent(parts.assistBlade, partList.X.CX.ASSIST_BLADE);
        // TODO: See if this should be moved elsewhere
        pushIfNotPresent(parts.ratchetIntegratedBit, partList.X.COMMON.RATCHET);
      } else if (parts.type === "CXE") {
        pushIfNotPresent(parts.lockChip, partList.X.CX.LOCK_CHIP);
        pushIfNotPresent(parts.metalBlade, partList.X.CXE.METAL_BLADE);
        pushIfNotPresent(parts.assistBlade, partList.X.CX.ASSIST_BLADE);
        pushIfNotPresent(parts.overBlade, partList.X.CXE.OVER_BLADE);
        // TODO: See if this should be moved elsewhere
        pushIfNotPresent(parts.ratchetIntegratedBit, partList.X.COMMON.RATCHET);
      }
      pushIfNotPresent(parts.ratchet, partList.X.COMMON.RATCHET);
      pushIfNotPresent(parts.bit, partList.X.COMMON.BIT);
    } catch (e) {
      console.error(e);
    }
  }
  return partList;
};

function pushIfNotPresent(part: string, arr: string[]) {
  if (!part) return;
  if (!arr.includes(part)) {
    arr.push(part);
  }
}

const extractParts = (beyblade: IBeyblade) => {
  const reToUse = remap[beyblade.type];
  if (!reToUse) {
    throw new Error(`Unkown type ${beyblade.type}`);
  }
  const p = remap[beyblade.type].exec(beyblade.name);
  if (!p?.groups) throw new Error(`Regex failed for ${beyblade.name}`);
  const res = {
    type: beyblade.type,
    ...p.groups,
  };
  return res as BeyParts;
};

const getRandomNumber = (max: number) => {
  return Math.ceil(Math.random() * max);
};

const getRandomItem = (arr: string[]): string => {
  const randIndex = getRandomNumber(arr.length) - 1;
  return arr[randIndex];
};

const rollSimulator = async (arr: string[]): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(getRandomItem(arr));
    }, 2000),
  );
};

const generateXCombo = (partList: IPartList, partsToSkip: string[]) => {
  // choose line
  // choose blade if ux bx. choose lock chip main blade assist blade if cx
  // choose ratchet. if RIB, skip bit
  // choose bit
  const lines = ["UX", "BX", "CX"];
  const chosenLine = getRandomItem(lines);
  let generatedBeyblade: IGeneratedBeyblade = {
    type: chosenLine,
    parts: [],
  };
  let usedParts = [] as string[];
  const getRandomItemAndAddToUsed = (list: string[]) => {
    const randomPart = getRandomItem(
      list.filter((p) => !partsToSkip.includes(p)),
    );
    usedParts.push(randomPart);
    return randomPart;
  };

  switch (chosenLine) {
    case "UX": {
      const bladeList = partList.X.UX.BLADE;
      generatedBeyblade.parts.push({
        type: "UX_BLADE",
        name: getRandomItemAndAddToUsed(bladeList),
      });
      break;
    }
    case "BX": {
      const bladeList = partList.X.BX.BLADE;
      generatedBeyblade.parts.push({
        type: "BX_BLADE",
        name: getRandomItemAndAddToUsed(bladeList),
      });
      break;
    }
    case "CX": {
      const lockChipList = partList.X.CX.LOCK_CHIP;
      const mainBladeList = partList.X.CX.MAIN_BLADE;
      const assistBladeList = partList.X.CX.ASSIST_BLADE;
      generatedBeyblade.parts.push({
        type: "LOCK_CHIP",
        name: getRandomItemAndAddToUsed(lockChipList),
      });
      generatedBeyblade.parts.push({
        type: "MAIN_BLADE",
        name: getRandomItemAndAddToUsed(mainBladeList),
      });
      generatedBeyblade.parts.push({
        type: "ASSIST_BLADE",
        name: getRandomItemAndAddToUsed(assistBladeList),
      });
    }
  }
  const ratchetList = partList.X.COMMON.RATCHET;
  const randomRatchet = getRandomItemAndAddToUsed(ratchetList);
  generatedBeyblade.parts.push({
    type: "RATCHET",
    name: randomRatchet,
  });
  if (RATCHET_INTEGRATED_BITS.includes(randomRatchet))
    return { generatedBeyblade, usedParts };

  const bitList = partList.X.COMMON.BIT;
  const randomBit = getRandomItemAndAddToUsed(bitList);
  generatedBeyblade.parts.push({
    type: "BIT",
    name: randomBit,
  });

  return { generatedBeyblade, usedParts };
};
const generateMFCombo = (partList: IPartList, partsToSkip: string[]) => {
  let generatedBeyblade: IGeneratedBeyblade = {
    type: "MF",
    parts: [],
  };
  let usedParts: string[] = [];

  const getRandomItemAndAddToUsed = (list: string[]) => {
    const randomPart = getRandomItem(
      list.filter((p) => !partsToSkip.includes(p)),
    );
    usedParts.push(randomPart);
    return randomPart;
  };

  const energyRingList = partList.MF.ENERGY_RING;
  const randomEnergyRing = getRandomItemAndAddToUsed(energyRingList);
  generatedBeyblade.parts.push({
    type: "ENERGY_RING",
    name: randomEnergyRing,
  });
  const fusionWheelList = partList.MF.FUSION_WHEEL;
  const randomFusionWheel = getRandomItemAndAddToUsed(fusionWheelList);
  generatedBeyblade.parts.push({
    type: "FUSION_WHEEL",
    name: randomFusionWheel,
  });
  const spinTrackList = partList.MF.SPIN_TRACK;
  const randomSpinTrack = getRandomItemAndAddToUsed(spinTrackList);
  generatedBeyblade.parts.push({
    type: "SPIN_TRACK",
    name: randomSpinTrack,
  });

  if (MF_4D_TIPS.includes(randomSpinTrack)) {
    return { generatedBeyblade, usedParts };
  }

  const performanceTipList = partList.MF.PERFORMANCE_TIP;
  const randomPerformanceTip = getRandomItemAndAddToUsed(performanceTipList);
  generatedBeyblade.parts.push({
    type: "PERFORMANCE_TIP",
    name: randomPerformanceTip,
  });

  return { generatedBeyblade, usedParts };
};

export const getNestedValue = (
  obj: Record<string, any>,
  path: string,
): string[] => {
  return path
    .split(".")
    .reduce((current, key) => current?.[key], obj) as string[];
};

export {
  generatePartList,
  getRandomItem,
  rollSimulator,
  generateMFCombo,
  generateXCombo,
};
