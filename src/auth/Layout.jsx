import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
const Layout = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/" || location.pathname === "/signup";
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {!hideSidebar && (
        <div style={{ width: "250px", borderRight: "1px solid #ddd" }}>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      )}
    </div>
  );
};

export default Layout;
