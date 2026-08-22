import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'
import CartDrawer from './CartDrawer'

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-crema">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
    </div>
  )
}
