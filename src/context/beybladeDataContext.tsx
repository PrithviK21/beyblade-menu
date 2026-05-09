import { createContext, useContext, useMemo } from "react";
import { useBeybladeData } from "../useBeybladeData";
import type { IBeybladeData, IPartList } from "../model";
import { generatePartList } from "../utils/partsUtils";

const defaultValue = {
  beybladeData: [] as IBeybladeData,
  partsList: {} as IPartList,
};

const BEYBLADE_X = "Beyblade X";
const METAL_SAGA = "Metal Saga";

const BeybladeDataContext = createContext(defaultValue);

export const BeybladeDataProvider = ({ children }: React.PropsWithChildren) => {
  const beybladeData = useBeybladeData();

  const partsList = useMemo(() => {
    return generatePartList(beybladeData);
  }, [beybladeData.length]);

  return (
    <BeybladeDataContext value={{ beybladeData, partsList }}>
      {children}
    </BeybladeDataContext>
  );
};

export const useBeybladeDataContext = () => {
  return useContext(BeybladeDataContext);
};
