import AdminNavbar from "../components/AdminNavbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="app-layout">

      <AdminNavbar />

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

export default AdminLayout;