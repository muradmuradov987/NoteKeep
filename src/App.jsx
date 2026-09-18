import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Notes from "./pages/Notes/Notes.jsx";
import Login from "./pages/Login/Login.jsx";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import Reminders from "./pages/Reminders/Reminders.jsx";
import Calendar from "./pages/Calendar/Calendar.jsx";
import Tasks from "./pages/Tasks/Tasks.jsx";
import Archive from "./pages/Archive/Archive.jsx";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />

      <Route element={<DashboardLayout/>}>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/notes" element={<Notes/>} />
        <Route path="/tasks" element={<Tasks/>} />
        <Route path="/archive" element={<Archive/>} />
        <Route path="/reminders" element={<Reminders/>} />
        <Route path="/calendar" element={<Calendar/>} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
