
import { Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <>
      <AppRoutes />
      <UserRoutes />
    </>
  );
}

export default App;