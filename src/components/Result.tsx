import React from "react";
import { useBeybladeDataContext } from "../context/beybladeDataContext";

function Result({ id }) {
  const { getGeneratedBeyblade } = useBeybladeDataContext();

  const generatedBeyblade = getGeneratedBeyblade(id);

  return (
    <div>
      {generatedBeyblade.parts.map((part) => (
        <div>
          {part.type} - {part.name}
        </div>
      ))}
    </div>
  );
}

export default Result;
