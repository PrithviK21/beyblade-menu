import type { IPart, IGeneratedBeyblade } from "../model";

export const addPartToGeneratedBeyblade = (id: 1 | 2, part: IPart) => {
  return {
    type: "add_part_to_generated_beyblade",
    payload: { id, part },
  };
};
export const setGeneratedBeyblade = (
  id: 1 | 2,
  beyblade: IGeneratedBeyblade,
) => {
  return {
    type: "set_generated_beyblade",
    payload: { id, beyblade },
  };
};
export const addTypeToGeneratedBeyblade = (id: 1 | 2, type: string) => {
  return {
    type: "add_type_to_generated_beyblade",
    payload: { id, type },
  };
};
export const resetState = () => {
  return {
    type: "reset_state",
    payload: null,
  };
};

export const initialReducerState = {
  generatedBeyblades: {
    1: {
      type: "",
      parts: [],
    } as IGeneratedBeyblade,
    2: {
      type: "",
      parts: [],
    } as IGeneratedBeyblade,
  },
  usedParts: [] as string[],
};
export const reducer = (
  state: typeof initialReducerState,
  action: { payload: any; type: string },
) => {
  switch (action.type) {
    case "add_part_to_generated_beyblade": {
      const { id, part } = action.payload as { id: 1 | 2; part: IPart };
      if (!id || !part) return state;
      return {
        generatedBeyblades: {
          ...state.generatedBeyblades,
          [id]: {
            ...state.generatedBeyblades[id],
            parts: [...state.generatedBeyblades[id].parts, part],
          },
        },
        usedParts: [...state.usedParts, part.name],
      };
    }
    case "add_type_to_generated_beyblade": {
      const { id, type } = action.payload as { id: 1 | 2; type: string };
      if (!id || !type) return state;
      return {
        ...state,
        generatedBeyblades: {
          ...state.generatedBeyblades,
          [id]: {
            ...state.generatedBeyblades[id],
            type,
          },
        },
      };
    }
    case "reset_state": {
      return initialReducerState;
    }
    case "set_generated_beyblade": {
      const { id, beyblade } = action.payload;
      return {
        ...state,
        generatedBeyblades: {
          ...state.generatedBeyblades,
          [id]: beyblade,
        },
      };
    }
  }
};
