// Datos de contacto de la marca (tomados del logo). Si el número de WhatsApp
// no abre el chat correctamente, ajustar el código de país/área en WHATSAPP_LINK
// (formato esperado por wa.me: 54 9 + código de área sin 0 + número sin 15).
export const WHATSAPP_NUMERO_DISPLAY = 'Tel. 3482 204062'
export const WHATSAPP_LINK = 'https://wa.me/5493482204062'

export function whatsappLinkConMensaje(mensaje) {
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(mensaje)}`
}
