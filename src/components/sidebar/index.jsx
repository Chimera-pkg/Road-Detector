import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  return (
    <div className ="bg-blue-900 fixed flex min-h-full flex-col" 
    >
      <div className="mx-[15px] mt-[40px] flex items-center">
        <div className=" mr-5 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          <img className="ml-5 h-16 w-22" src="/logo.png"  />
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
