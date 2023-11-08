import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import Upload from "./components/Upload";
import Preview from "./components/Preview";

import TotalCard from "components/card/TotalCard";
import RetakCard from "components/card/RetakCard";
import LubangCard from "components/card/LubangCard";
import BuayaCard from "components/card/BuayaCard";
import MelintangCard from "components/card/MelintangCard";

import { columnsDataColumns } from "./variables/columnsData";
import tableDataColumns from "./variables/tableDataColumns.json";
import ColumnsTable from "./components/ColumnsTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";

import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [historyData, setHistoryData] = useState([]);
  const [totalLubang, setTotalLubang] = useState(0);
  const [totalRetakMelintang, setTotalRetakMelintang] = useState(0);
  const [totalRetakMemanjang, setTotalRetakMemanjang] = useState(0);
  const [totalRetakBuaya, setTotalRetakBuaya] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false); // Track whether data is loaded

  const fetchHistoryData = async (fileName) => {
    try {
      const url = fileName
        ? `https://rdd-backend.x-camp.id/history?fileName=${fileName}`
        : "https://rdd-backend.x-camp.id/history";
        
        // ? `http://localhost:3001/history?fileName=${fileName}`
        // : 'http://localhost:3001/history';
        // harus diganti database


      const response = await fetch(url);
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.error("Error fetching history data:", error);
    } finally {
      setDataLoaded(true); // Indicate that data is loaded
    }
  };
  useEffect(() => {
    const isFirstVisit = localStorage.getItem('isFirstVisit');

      // Tampilkan swal peringatan saat pengguna pertama kali mengakses halaman /admin
      Swal.fire({
        title: 'Selamat Datang!',
        text: 'Ini adalah halaman dengan Fitur Gratis, Apabila anda tertarik silahkan hubungi X-Camp',
        icon: 'success',
        confirmButtonText: 'Oke'
      });

      // Tandai bahwa pengguna telah mengunjungi halaman /admin
      localStorage.setItem('isFirstVisit', 'true');
  }, []);
  useEffect(() => {
    fetchHistoryData(); // To initially fetch all history data
  }, []);

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

  const totalSemua =
    totalLubang + totalRetakMemanjang + totalRetakBuaya + totalRetakMelintang;

  return (
    <div className="mt-10">
      {/* Jumlah lubang card */}
      <div className="grid gap-10 md:grid-cols-5">
        <TotalCard title="Total Kerusakan" value={totalSemua} />
        <LubangCard title="Lubang" value={totalLubang} />
        <MelintangCard title="Retak Melintang" value={totalRetakMelintang} />
        <RetakCard title="Retak Memanjang" value={totalRetakMemanjang} />
        <BuayaCard title="Retak Buaya" value={totalRetakBuaya} />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
        {dataLoaded && (
          <DailyTraffic
            totalLubang={totalLubang}
            totalRetakMelintang={totalRetakMelintang}
            totalRetakMemanjang={totalRetakMemanjang}
            totalRetakBuaya={totalRetakBuaya}
          />
        )}
        <div className=" w-full gap-5 ">
          <Upload />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
