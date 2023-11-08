import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import HistoryLog from "views/admin/history";
import Damage from "views/admin/damage";

// Auth Imports

// Icon Imports
import {
  MdHistory,
  MdHome,
  MdMonitor,
  MdOutlineShowChart,
  MdShowChart,
} from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Result",
    layout: '/admin',
    path: "damage-list",
    icon: <MdMonitor className="h-6 w-6" />,
    component: <Damage/>,
    secondary: true,
  },

  {
    name: "History Log",
    layout: "/admin",
    path: "history",
    icon: <MdHistory className="h-6 w-6" />,
    component: <HistoryLog />,
    secondary: true,
  },

];
export default routes;
