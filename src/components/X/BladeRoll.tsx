import React from "react";
import { useBeybladeDataContext } from "../../context/beybladeDataContext";

// UX, BX, CX, CXE -> handle all here
function BladeRoll() {
  const { partsList } = useBeybladeDataContext();

  const BX_BLADES = partsList.X.BX.BLADE;
  const UX_BLADES = partsList.X.UX.BLADE;

  return <div>BladeRoll</div>;
}

export default BladeRoll;
