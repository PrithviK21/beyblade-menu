const cxre =
  /(?<lockChip>\w*)\s(?<mainBlade>\w*)\s(?<assistBlade>\w)\s(?<ratchetIntegratedBit>[A-Z]*)?(?<ratchet>[\w]-\d\d)?\s?(?<bit>\w{0,3})/i;
const cxere =
  /(?<lockChip>\w*)\s(?<metalBlade>\w*)\s(?<overBlade>\w*)\s(?<assistBlade>\w)\s(?<ratchetIntegratedBit>[A-Z]*)?(?<ratchet>[\w]-\d\d)?\s?(?<bit>\w{0,3})/i;
const bxre = /(?<blade>\w*)\s(?<ratchet>[\w]-\d\d)\s(?<bit>\w*)/i;
const mfre =
  /(?<fusionWheel>[A-Z\-]*)\s(?<energyRing>[A-Z]*)\s(?<spinTrack>[A-Z]*\d+)?\s?(?<performanceTip>[/:\w]*)/i;
export const remap = {
  UX: bxre,
  BX: bxre,
  CX: cxre,
  CXE: cxere,
  MF: mfre,
};
