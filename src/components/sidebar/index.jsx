import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`bg-navy-1000 duration-175 linear fixed flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <div className="mx-[15px] mt-[40px] flex items-center">
        <div className=" ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          <img className="ml-5 h-16 w-25" src="/logo_hore.png"  />
        </div>
      </div>
      <div class="mt-[58px] mb-7" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
