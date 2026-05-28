import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ActionDispatch,
} from "react";
import { useBeybladeData } from "../useBeybladeData";
import type {
  IBeybladeData,
  IGeneratedBeyblade,
  IPart,
  IPartList,
} from "../model";
import { generatePartList } from "../utils/partsUtils";
import { initialReducerState, reducer } from "./reducer";

type IBeybladeContext = {
  beybladeData: IBeybladeData;
  partsList: IPartList;
  // addPartToGeneratedBeyblade: (id: string, part: IPart) => void;
  getGeneratedBeyblade: (id: 1 | 2) => IGeneratedBeyblade;
  getLatestBeybladePart: (id: 1 | 2) => IPart | undefined;
  // setGeneratedBeybladeType: (id: string, type: string) => void;
  dispatch: ActionDispatch<any>;
  usedParts: string[];
};

const BEYBLADE_X = "Beyblade X";
const METAL_SAGA = "Metal Saga";

const BeybladeDataContext = createContext<IBeybladeContext>(
  {} as IBeybladeContext,
);

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

  const usedParts = state.usedParts;

  return (
    <BeybladeDataContext
      value={{
        beybladeData,
        partsList,
        dispatch,
        getGeneratedBeyblade,
        getLatestBeybladePart,
        usedParts,
      }}
    >
      {children}
    </BeybladeDataContext>
  );
};

export const useBeybladeDataContext = () => {
  return useContext(BeybladeDataContext);
};
