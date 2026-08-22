import { WHATSAPP_NUMERO_DISPLAY, whatsappLinkConMensaje } from '../data/contacto'
import Boton from '../components/Boton'

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
      <span className="text-5xl">💌</span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-choco-900 sm:text-5xl">
        Contacto
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-choco-600">
        ¿Tenés ganas de algo rico? Escribinos por WhatsApp contándonos qué se te antoja y
        coordinamos tu pedido.
      </p>

      <div className="mt-8 rounded-3xl border border-crema-3 bg-white p-8 sm:p-10">
        <p className="font-display text-2xl text-choco-900">{WHATSAPP_NUMERO_DISPLAY}</p>

        <Boton
          as="a"
          href={whatsappLinkConMensaje('¡Hola! Quería hacer una consulta sobre sus productos 🧁')}
          target="_blank"
          rel="noreferrer"
          variant="ladrillo"
          className="mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3 font-display text-lg"
        >
          💬 Escribir por WhatsApp
        </Boton>

        <p className="mt-6 text-sm text-choco-500">
          También podés vernos en el catálogo y contarnos qué producto te gustó.
        </p>
      </div>
    </div>
  )
}
