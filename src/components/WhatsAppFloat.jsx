import { WHATSAPP_LINK } from '../data/contacto'
import Boton from './Boton'

export default function WhatsAppFloat() {
  return (
    <Boton
      as="a"
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      variant="ladrillo"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
    >
      💬
    </Boton>
  )
}
