import { useBeybladeDataContext } from "../context/beybladeDataContext";

function Result({ id }: { id: 1 | 2 }) {
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
