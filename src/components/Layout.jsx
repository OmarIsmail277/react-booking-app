// Layout.jsx
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const noBackgroundRoutes = ["/login", "/register"];

  const shouldApplyBackground = !noBackgroundRoutes.includes(location.pathname);

  return (
    <div
      style={{
        backgroundColor: shouldApplyBackground ? "#f3f6f8" : "white",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
