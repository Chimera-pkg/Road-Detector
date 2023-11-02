import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";

const RetakCard = ({ title, value, extra }) => {
  const [heart, setHeart] = useState(true);
  return (
    <Card
      extra={`flex flex-row w-full h-full !p-4 3xl:p-![13px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <img className="h-13 w-13" src="/buaya.png"></img>
          <div className="">
            <p className="mr-5 text-[20px] font-sm text-navy-700 dark:text-white">
              {title}
            </p>
            <p className="mr-5  text-[19px] font-bold md:mt-2">{value}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RetakCard;
