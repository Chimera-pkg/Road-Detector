import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";

const MelintangDetail = ({ title, value, extra }) => {
  const [heart, setHeart] = useState(true);
  return (
      
      <div
        className="rounded-[20px] bg-cover bg-center"
        style={{ backgroundImage: 'url("/bg3.png")' }}
      >
        <div className="flex lg:flex-row lg:justify-between">
          <div className="ml-5">
            <p className="py-4 text-[24px] text-lg font-bold text-white  dark:text-white">
              {title}
            </p>
            <p className="mr-5 text-[64px] font-bold text-white md:mt-2">
              {value}
            </p>
          </div>
        </div>
      </div>
  );
};

export default MelintangDetail;
