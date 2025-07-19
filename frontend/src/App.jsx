import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainProvider } from "./context/MainContext.jsx";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "./pages/Dashboard";
import AssignOrders from "./pages/AssignOrders";
import EntryComplaint from "./pages/EntryComplaint";
import DownloadDrivers from "./pages/DownloadDrivers";
import Layout from "./components/Layout.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <MainProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes layout */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assign/" element={<AssignOrders />} />
              <Route path="/entry-complaint/" element={<AssignOrders />} />

              {/* <Route path="/entry-complaint/" element={<EntryComplaint />} /> */}
              <Route path="/drivers" element={<DownloadDrivers />} />
            </Route>
          </Route>
        </Routes>
      </MainProvider>
    </BrowserRouter>
  );
}
