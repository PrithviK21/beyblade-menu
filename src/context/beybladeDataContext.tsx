import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ActionDispatch,
} from "react";
import { useBeybladeData } from "../useBeybladeData";
import type { IBeybladeData, IPartList } from "../model";
import { generatePartList } from "../utils/partsUtils";

type IPart = {
  type: string;
  name: string;
};

type IGeneratedBeyblade = {
  type: string;
  parts: IPart[];
};

type IBeybladeContext = {
  beybladeData: IBeybladeData;
  partsList: IPartList;
  // addPartToGeneratedBeyblade: (id: string, part: IPart) => void;
  getGeneratedBeyblade: (id: 1 | 2) => IGeneratedBeyblade;
  getLatestBeybladePart: (id: 1 | 2) => IPart | undefined;
  // setGeneratedBeybladeType: (id: string, type: string) => void;
  dispatch: ActionDispatch<any>;
};

const BEYBLADE_X = "Beyblade X";
const METAL_SAGA = "Metal Saga";

const BeybladeDataContext = createContext<IBeybladeContext>(
  {} as IBeybladeContext,
);

const initialReducerState = {
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
};

export const BeybladeDataProvider = ({ children }: React.PropsWithChildren) => {
  const beybladeData = useBeybladeData();

  const [state, dispatch] = useReducer<typeof initialReducerState, any>(
    reducer,
    initialReducerState,
  );

  const getGeneratedBeyblade = (id: 1 | 2) => {
    return state.generatedBeyblades[id];
  };

  const getLatestBeybladePart = (id: 1 | 2) => {
    return state.generatedBeyblades[id].parts.at(-1);
  };

  const partsList = useMemo(() => {
    return generatePartList(beybladeData);
  }, [beybladeData.length]);

  return (
    <BeybladeDataContext
      value={{
        beybladeData,
        partsList,
        dispatch,
        getGeneratedBeyblade,
        getLatestBeybladePart,
      }}
    >
      {children}
    </BeybladeDataContext>
  );
};

export const useBeybladeDataContext = () => {
  return useContext(BeybladeDataContext);
};

type IAction = {
  type: string;
  payload: {
    id?: 1 | 2;
    part?: string;
    type?: string;
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add_part_to_generated_beyblade": {
      const { id, part } = action.payload;
      if (!id || !part) return state;
      return {
        generatedBeyblades: {
          ...state.generatedBeyblades,
          [id]: {
            ...state.generatedBeyblades[id],
            parts: [...state.generatedBeyblades[id].parts, part],
          },
        },
      };
    }
    case "add_type_to_generated_beyblade": {
      const { id, type } = action.payload;
      if (!id || !type) return state;
      return {
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
  }
};

export const addPartToGeneratedBeyblade = (id, part: IPart) => {
  return {
    type: "add_part_to_generated_beyblade",
    payload: { id, part },
  };
};
export const addTypeToGeneratedBeyblade = (id, type: string) => {
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
