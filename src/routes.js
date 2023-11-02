import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import DataTables from "views/admin/tables";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdShowChart,
  MdDetails,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Result",
    layout: "/admin",
    path: "damage-list",
    icon: <MdShowChart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  // {
  //   name: "Detail",
  //   layout: "/admin",
  //   path: "detail",
  //   icon: <MdDetails className="h-6 w-6" />,
  //   component: <DataTables/>,
  //   secondary: true,
  // },
];
export default routes;
