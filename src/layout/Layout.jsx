import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-layout">

      <Navbar />

      <div className="right-area">

        <div className="top-header">
          <Header />
        </div>

        <div className="content-area">
          <Outlet />
        </div>

        <div className="center-footer">
          <Footer />
        </div>

      </div>
    </div>
  );
}

export default Layout;