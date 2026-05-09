// FIXME: Fails for Pegasus 145 RF

import { remap } from "../beybladeParser";
import type { IBeybladeData, IPartList, IBeyblade, BeyParts } from "../model";

// TODO: Remove duplicates and undefined values
const generatePartList = (beyblades: IBeybladeData) => {
  let partList: IPartList = {
    X: {
      CX: {
        MAIN_BLADE: [],
        ASSIST_BLADE: [],
      },
      CXE: {
        METAL_BLADE: [],
        OVER_BLADE: [],
        ASSIST_BLADE: [],
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
        pushIfNotPresent(parts.mainBlade, partList.X.CX.MAIN_BLADE);
        pushIfNotPresent(parts.assistBlade, partList.X.CX.ASSIST_BLADE);
        // TODO: See if this should be moved elsewhere
        pushIfNotPresent(parts.ratchetIntegratedBit, partList.X.COMMON.RATCHET);
      } else if (parts.type === "CXE") {
        pushIfNotPresent(parts.metalBlade, partList.X.CXE.METAL_BLADE);
        pushIfNotPresent(parts.assistBlade, partList.X.CXE.ASSIST_BLADE);
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
  return Math.ceil(Math.random() * (max + 1));
};

const getRandomItem = (arr: string[]): string => {
  const randIndex = getRandomNumber(arr.length) - 1;
  return arr[randIndex];
};

const rollSimulator = async (arr): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(getRandomItem(arr));
    }, 2000),
  );
};

export { generatePartList, getRandomItem, rollSimulator };
