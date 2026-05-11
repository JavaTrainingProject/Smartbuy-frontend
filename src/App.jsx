
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import UserRoutes from "./routes/UserRoutes";

import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <Routes>
     <Route path="/*" element={<AppRoutes /> } />

     <Route path="/user/*" element={<UserRoutes />} />

     <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default App;