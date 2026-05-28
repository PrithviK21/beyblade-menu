import Papa from "papaparse";
import { useEffect, useState } from "react";
import type { IBeybladeData, IBeybladeType, IparsedCSV } from "./model";

const getBeybladeDataFromFile = async (): Promise<IparsedCSV> => {
  const raw = await fetch("/beyblade.csv");
  const text = await raw.text();
  const parsed = Papa.parse(text, {
    header: true,
  });
  return parsed.data as IparsedCSV;
};

const resolveBeyType = (ID: string): IBeybladeType => {
  const splitArr = ID.split("-");
  // if (splitArr?.[2] === "E") return "CXE";
  return splitArr[0] as IBeybladeType;
};

// TODO: Update app to work with CXE beys
const transformBeybladeData = (parsedCSV: IparsedCSV): IBeybladeData => {
  const filteredList = parsedCSV.map((row) => ({
    id: row.ID,
    series: row.Series,
    name: row.Name,
    type: resolveBeyType(row.ID),
  }));
  return filteredList;
};
export const useBeybladeData = () => {
  const [bbData, setBBData] = useState<IBeybladeData>([]);
  useEffect(() => {
    async function fetchData() {
      if (bbData.length > 0) return;
      const csvData = await getBeybladeDataFromFile();
      const res = transformBeybladeData(csvData);
      setBBData(res);
    }
    fetchData();
  }, []);

  return bbData;
};
