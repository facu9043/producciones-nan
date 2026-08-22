const VARIANTES = {
  ladrillo: 'btn-ladrillo',
  mostaza: 'btn-mostaza',
  terracota: 'btn-terracota',
  oliva: 'btn-oliva',
  vino: 'btn-vino',
  ghost: 'btn-ghost',
}

// Botón "premium" compartido: hover con escala + sombra, press, y ripple
// desde el punto exacto de click. Reusar en cualquier CTA del sitio/admin.
export default function Boton({
  variant = 'ladrillo',
  as: Comp = 'button',
  className = '',
  onPointerDown,
  children,
  ...props
}) {
  function handlePointerDown(e) {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const btn = e.currentTarget
      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 1.4
      const span = document.createElement('span')
      span.className = 'ripple'
      span.style.width = span.style.height = `${size}px`
      span.style.left = `${e.clientX - rect.left - size / 2}px`
      span.style.top = `${e.clientY - rect.top - size / 2}px`
      btn.appendChild(span)
      span.addEventListener('animationend', () => span.remove())
    }
    onPointerDown?.(e)
  }

  return (
    <Comp
      className={`btn-tactile ${VARIANTES[variant]} ${className}`}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {children}
    </Comp>
  )
}
