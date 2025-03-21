import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Inventory from './pages/Inventory.tsx'
import Navbar from './components/Navbar.tsx'
import BillingHistoryPage from './pages/InvoiceHistory.tsx'
import Invoice from './pages/Invoice.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route element={<Navbar />}>
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/billing' element={<BillingHistoryPage />} />
          <Route path='/invoice' element={<Invoice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
