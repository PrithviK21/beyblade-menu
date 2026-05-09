type IparsedCSV = {
    ID:string,
    Series:string,
    Name:string
    // More fields exist, not requried
}[]

type IBeybladeData = IBeyblade[]

type IBeyblade = {
    id:string,
    series:string,
    name:string,
    type:IBeybladeType
}

type IBeybladeType = "UX"|"BX"|"CX"|"MF"|"CXE"


type MFRegexGroups = {
    type:"MF",
    fusionWheel:string,
    energyRing:string,
    spinTrack:string,
    performanceTip:string
}
type UXRegexGroups = {
    type:"UX"|"BX",
    blade:string,
    ratchet:string,
    bit:string,
}
type CXRegexGroups = {
    type:"CX",
    lockChip:string,
    mainBlade:string,
    assistBlade:string,
    ratchet:string,
    bit:string,
    ratchetIntegratedBit:string
}
type CXERegexGroups = {
    type:"CXE",
    lockChip:string,
    metalBlade:string,
    assistBlade:string,
    overBlade:string,
    ratchet:string,
    bit:string,
    ratchetIntegratedBit:string
}
type BeyParts = MFRegexGroups | UXRegexGroups | CXRegexGroups | CXERegexGroups

type IPartList = {
        X:{
            CX:{
                MAIN_BLADE:string[],
                ASSIST_BLADE:string[]
            },
            CXE:{
                METAL_BLADE:string[],
                OVER_BLADE:string[],
                ASSIST_BLADE:string[]
            },
            BX:{
                BLADE:string[]
            },
            UX:{
                BLADE:string[]
            },
            COMMON:{
                RATCHET:string[],
                BIT:string[]
            }
        },
        MF:{
            FUSION_WHEEL:string[],
            ENERGY_RING:string[],
            SPIN_TRACK:string[],
            PERFORMANCE_TIP:string[]
        }
    }


export type {IparsedCSV, IBeybladeData, IBeyblade, IBeybladeType, BeyParts, IPartList}