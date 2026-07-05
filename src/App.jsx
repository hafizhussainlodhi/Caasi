import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import User from './pages/User'
import ExpenseReport from './pages/ExpenseReport'
import ActivityReport from './pages/ActivityReport'
import Setting from './pages/Setting'
import ReportExport from './pages/ReportExport'
import Notifications from './pages/Notification'
import DaysOfAbsence from './pages/DaysOf'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/expense-report" element={<ExpenseReport />} />
        <Route path="/activity-report" element={<ActivityReport />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/reports" element={<ReportExport />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/absence" element={<DaysOfAbsence />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
