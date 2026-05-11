import UserNavbar from "../components/UserNavbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";
function UserLayout() {
  return (
    <div className="app-layout">

      <UserNavbar />

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

export default UserLayout;