import { WHATSAPP_NUMERO_DISPLAY, WHATSAPP_LINK } from '../data/contacto'
import Boton from './Boton'

export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-crema-3 bg-crema-2">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6">
        <p className="font-display text-xl text-choco-900">
          Producciones <span className="text-ladrillo">Nan</span>
        </p>
        <p className="mt-1 text-sm text-choco-600">Panadería y pastelería artesanal · Sin TACC</p>

        <Boton
          as="a"
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          variant="ladrillo"
          className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 font-display"
        >
          💬 {WHATSAPP_NUMERO_DISPLAY}
        </Boton>

        <p className="mt-6 text-xs text-choco-500">Hecho con pasión y dedicación 💕</p>
      </div>
    </footer>
  )
}
