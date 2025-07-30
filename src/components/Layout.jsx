import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Searchbar from "./SearchBar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
  };

  const mainContentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "hidden",
  };

  return (
    <div style={layoutStyle}>
      <div>
        <Sidebar />
      </div>

      <div style={mainContentStyle}>
        <Navbar />
        <Searchbar />
        <Outlet />
        <main>{children}</main>
      </div>
    </div>
  );
}
