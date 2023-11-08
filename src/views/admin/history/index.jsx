import { columnsDataColumns } from "./variables/columnsData";
import tableDataColumns from "./variables/tableDataColumns.json";
import ColumnsTable from "./components/ColumnsTable";
import LubangDetail from "components/card/LubangDetail";
import MemanjangDetail from "components/card/MemanjangDetail";
import MelintangDetail from "components/card/MelintangDetail";
import BuayaDetail from "components/card/BuayaDetail";
import React, { useState, useEffect } from "react";

const Marketplace = () => {
  const [historyData, setHistoryData] = useState([]);
  const [totalLubang, setTotalLubang] = useState(0);
  const [totalRetakMelintang, setTotalRetakMelintang] = useState(0);
  const [totalRetakMemanjang, setTotalRetakMemanjang] = useState(0);
  const [totalRetakBuaya, setTotalRetakBuaya] = useState(0);

  // Function to parse the URL and extract the "file" query parameter
  const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const file = getQueryParam("file"); // Get the "file" query parameter
  console.log(file);
  const fetchHistoryData = async () => {
    try {
      const url = file
      ? `https://rdd-backend.x-camp.id/history?fileName=${fileName}`
      : "https://rdd-backend.x-camp.id/history";
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

 

  // Calculate the totals for each type of damage
  useEffect(() => {
    // Calculate the totals based on the fetched history data
    const newTotalLubang = historyData.reduce(
      (total, item) => total + item.lubang,
      0
    );
    const newTotalRetakMelintang = historyData.reduce(
      (total, item) => total + item.retak_melintang,
      0
    );
    const newTotalRetakMemanjang = historyData.reduce(
      (total, item) => total + item.retak_memanjang,
      0
    );
    const newTotalRetakBuaya = historyData.reduce(
      (total, item) => total + item.retak_buaya,
      0
    );

    // Update the state variables with the new totals
    setTotalLubang(newTotalLubang);
    setTotalRetakMelintang(newTotalRetakMelintang);
    setTotalRetakMemanjang(newTotalRetakMemanjang);
    setTotalRetakBuaya(newTotalRetakBuaya);
  }, [historyData]);
  return (
    <div className="mt-5">
      <div>
        {/* Jumlah lubang card */}
        <div className="mt-10  grid-cols-2 gap-5">
          <ColumnsTable
            className="h-full w-full"
            columnsData={columnsDataColumns}
            tableData={tableDataColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
