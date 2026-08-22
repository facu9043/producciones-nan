import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import CatalogoPage from './pages/CatalogoPage'
import SobreNosotrosPage from './pages/SobreNosotrosPage'
import ContactoPage from './pages/ContactoPage'
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminResenas from './pages/admin/AdminResenas'
import RequireAuth from './components/admin/RequireAuth'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<CatalogoPage />} />
        <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="resenas" element={<AdminResenas />} />
      </Route>
    </Routes>
  )
}

export default App
