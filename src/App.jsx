
import { Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import UserRoutes from "./routes/UserRoutes";

import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <>
      <AppRoutes />
      <UserRoutes />
      <AdminRoutes/>
    </>
  );
}

export default App;