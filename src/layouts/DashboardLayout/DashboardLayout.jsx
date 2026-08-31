import { Outlet } from "react-router";
import "./DashboardLayout.css";
import Navbar from "../../components/Navbar/Navbar";
import { SideBar } from "../../components/SideBar/SideBar";
import { useEffect, useState } from "react";
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (e) => {
      if (e.matches) {
        setSidebarOpen(false);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className="dashboard-layout">
      <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
