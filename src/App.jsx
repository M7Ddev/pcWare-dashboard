import { useState } from "react";
import DashBoardLayouts from "./layouts/DashboardLayouts";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  // Boolean مو string
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route للصفحة الرئيسية */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          }
        />

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* خله /dashboard بدل /DashboardLayouts (اسم route يكون واضح) */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashBoardLayouts setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
