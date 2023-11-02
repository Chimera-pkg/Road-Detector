import BarChart from "components/charts/BarChart";
import { barChartOptionsDailyTraffic } from "variables/charts";
import { MdArrowDropUp } from "react-icons/md";
import Card from "components/card";
const DailyTraffic = ({
  totalLubang,
  totalRetakMelintang,
  totalRetakMemanjang,
  totalRetakBuaya,
}) => {
  const shouldRenderDailyTraffic =
    totalLubang === 0 &&
    totalRetakMelintang === 0 &&
    totalRetakMemanjang === 0 &&
    totalRetakBuaya === 0;
  const barChartDataDailyTraffic = [
    {
      name: "TOTAL KERUSAKAN",
      data: [
        totalLubang,
        totalRetakMelintang,
        totalRetakMemanjang,
        totalRetakBuaya,
      ],
    },
  ];
  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-[34px] font-bold text-navy-700 dark:text-white">
            Distribution Chart{" "}
          </p>
        </div>
      </div>

      <div className="h-[300px] w-full pt-10 pb-0">
        {!shouldRenderDailyTraffic && (
          <BarChart
            chartData={barChartDataDailyTraffic}
            chartOptions={barChartOptionsDailyTraffic}
          />
        )}
      </div>
    </Card>
  );
};

export default DailyTraffic;
