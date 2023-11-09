import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const ColumnsTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const [historyData, setHistoryData] = useState([]);
  const [totalLubang, setTotalLubang] = useState(0);
  const [totalRetakMelintang, setTotalRetakMelintang] = useState(0);
  const [totalRetakMemanjang, setTotalRetakMemanjang] = useState(0);
  const [totalRetakBuaya, setTotalRetakBuaya] = useState(0);
  const [beforeDetection, setBeforeDetection] = useState("");
  const [afterDetection, setAfterDetection] = useState("");
  const [namaFile, setNamaFile] = useState("");

  // Function to parse the URL and extract the "file" query parameter
  const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const file = getQueryParam("file"); // Get the "file" query parameter
  const isVideo = namaFile.toLowerCase().endsWith(".mp4");
  const fetchHistoryData = async () => {
    try {
      const url = file
        ? `https://testingapirdd.x-camp.id/get-history?fileName=${file}`
        : "https://testingapirdd.x-camp.id/get-history";
      axios
        .get(url)
        .then((res) => {
          const data = res.json();
          console.log(data);
          setHistoryData(data);
        })
        .catch((error) => {
          console.error("Error in fetching last history:", error);
        });
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  useEffect(() => {
    fetchHistoryData(); // To initially fetch all history data
  }, [file]);

  // Calculate the totals for each type of damage
  useEffect(() => {
    if (historyData.length > 0) {
      // Calculate the totals based on the fetched history data
      const newTotalLubang = historyData.reduce(
        (total, item) => total + item.lubang_confidence,
        0
      );
      const newTotalRetakMelintang = historyData.reduce(
        (total, item) => total + item.retak_melintang_confidence,
        0
      );
      const newTotalRetakMemanjang = historyData.reduce(
        (total, item) => total + item.retak_memanjang_confidence,
        0
      );
      const newTotalRetakBuaya = historyData.reduce(
        (total, item) => total + item.retak_buaya_confidence,
        0
      );
      console.log("history", historyData);
      const newBeforeDetection = historyData[0].before_detection;
      const newAfterDetection = historyData[0].after_detection;
      const initNamaFile = historyData[0].nama_file;

      // Update the state variables with the new totals
      setTotalLubang(newTotalLubang);
      setTotalRetakMelintang(newTotalRetakMelintang);
      setTotalRetakMemanjang(newTotalRetakMemanjang);
      setTotalRetakBuaya(newTotalRetakBuaya);
      setBeforeDetection(newBeforeDetection);
      setAfterDetection(newAfterDetection);
      setNamaFile(initNamaFile);
    }
  }, [historyData]);

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-[30px] font-bold text-navy-700 dark:text-white">
          Overview
        </div>
        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pb-[10px] pr-14 text-start dark:!border-navy-700"
                  >
                    <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            <tr>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  1
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                  jalan.jpg
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                  2023-11-01 18:49:45
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                {/* {totalLubang} */}
                10
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]"></td>
            </tr>
            <tr>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  2
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                  jalan2.jpeg
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                  2023-11-01 18:30:56
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">4</td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]"></td>
            </tr>
            <tr>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  3
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                  Sumatra.mp4
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                  {/* {totalRetakMelintang} */}
                  2023-11-01 21:34:14
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">24</td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]"></td>
            </tr>
            <tr>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  4
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                  Lampung.mp4
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">
                <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                  {/* {totalRetakBuaya} */}
                  2023-11-01 18:29:43
                </p>
              </td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]">44</td>
              <td className="pb-[20px] pt-[10px] sm:text-[14px]"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ColumnsTable;
