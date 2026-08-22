import { useRef, useState } from 'react'
import { CATEGORIAS, ACENTO_POR_CATEGORIA, FONDO_POR_ACENTO, TEXTO_POR_ACENTO } from '../../data/categorias'
import { updateProducto, uploadProductoImage, deleteProducto } from '../../data/productosApi'
import Boton from '../Boton'

function draftDeProducto(producto) {
  return {
    name: producto.name,
    category: producto.category,
    price: producto.price,
    sinTacc: producto.sinTacc,
    descripcion: producto.descripcion,
    variantes: producto.variantes,
  }
}

export default function ProductoRow({ producto, onChange, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(() => draftDeProducto(producto))
  const [nuevaVariante, setNuevaVariante] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const acento = ACENTO_POR_CATEGORIA[producto.category] || 'ghost'

  function handleEditar() {
    setDraft(draftDeProducto(producto))
    setEditing(true)
  }

  function handleCancelar() {
    setDraft(draftDeProducto(producto))
    setEditing(false)
  }

  async function handleGuardar() {
    setSaving(true)
    try {
      const actualizado = await updateProducto(producto.id, {
        ...draft,
        price: Number(draft.price) || 0,
      })
      onChange(actualizado)
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  function agregarVariante() {
    const v = nuevaVariante.trim()
    if (!v || draft.variantes.includes(v)) return
    setDraft((d) => ({ ...d, variantes: [...d.variantes, v] }))
    setNuevaVariante('')
  }

  function quitarVariante(v) {
    setDraft((d) => ({ ...d, variantes: d.variantes.filter((x) => x !== v) }))
  }

  async function handleToggleActivo() {
    const actualizado = await updateProducto(producto.id, { active: !producto.active })
    onChange(actualizado)
  }

  async function handleArchivo(file) {
    if (!file) return
    setUploading(true)
    try {
      const actualizado = await uploadProductoImage(producto.id, file)
      onChange(actualizado)
    } finally {
      setUploading(false)
    }
  }

  async function handleEliminar() {
    if (!confirm(`¿Eliminar "${producto.name}"? Esta acción no se puede deshacer.`)) return
    await deleteProducto(producto.id)
    onDelete(producto.id)
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-crema-3 bg-white p-4 sm:flex-row">
      {/* Foto: en modo edición, drag&drop y click; en solo lectura, miniatura fija */}
      {editing ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleArchivo(e.dataTransfer.files?.[0])
          }}
          className={`flex h-28 w-28 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed text-4xl transition-colors ${
            dragOver ? 'border-ladrillo bg-ladrillo-light' : 'border-crema-3 bg-crema-2'
          }`}
        >
          {uploading ? (
            <span className="text-sm text-choco-500">Subiendo…</span>
          ) : producto.imageUrl ? (
            <img src={producto.imageUrl} alt={producto.name} className="h-full w-full object-cover" />
          ) : (
            <span>{producto.pattern}</span>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleArchivo(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div className={`flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl text-4xl ${FONDO_POR_ACENTO[acento]}`}>
          {producto.imageUrl ? (
            <img src={producto.imageUrl} alt={producto.name} className="h-full w-full object-cover" />
          ) : (
            <span>{producto.pattern}</span>
          )}
        </div>
      )}

      {editing ? (
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            placeholder="Nombre del producto"
            className="rounded-lg border border-crema-3 px-3 py-1.5 outline-none focus:border-ladrillo"
          />
          <select
            value={draft.category}
            onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
            className="rounded-lg border border-crema-3 px-3 py-1.5 outline-none focus:border-ladrillo"
          >
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            step="0.01"
            value={draft.price}
            onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))}
            placeholder="Precio"
            className="rounded-lg border border-crema-3 px-3 py-1.5 outline-none focus:border-ladrillo"
          />
          <label className="flex items-center gap-2 text-sm text-choco-600">
            <input
              type="checkbox"
              checked={draft.sinTacc}
              onChange={(e) => setDraft((d) => ({ ...d, sinTacc: e.target.checked }))}
              className="h-4 w-4 accent-oliva"
            />
            Sin TACC
          </label>
          <textarea
            value={draft.descripcion}
            onChange={(e) => setDraft((d) => ({ ...d, descripcion: e.target.value }))}
            placeholder="Descripción / ingredientes (opcional)"
            rows={2}
            className="rounded-lg border border-crema-3 px-3 py-1.5 outline-none focus:border-ladrillo sm:col-span-2"
          />

          <div className="sm:col-span-2">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-choco-500">
              Variantes (opcional — ej. sabores)
            </p>
            <div className="mb-2 flex flex-wrap gap-2">
              {draft.variantes.map((v) => (
                <span
                  key={v}
                  className="flex items-center gap-1.5 rounded-full bg-crema-2 py-1 pl-3 pr-1.5 text-sm text-choco-700"
                >
                  {v}
                  <button
                    onClick={() => quitarVariante(v)}
                    aria-label={`Quitar ${v}`}
                    className="flex h-5 w-5 items-center justify-center rounded-full text-choco-400 hover:text-vino-dark"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={nuevaVariante}
                onChange={(e) => setNuevaVariante(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), agregarVariante())}
                placeholder="Ej. Chocolate blanco"
                className="flex-1 rounded-lg border border-crema-3 px-3 py-1.5 text-sm outline-none focus:border-ladrillo"
              />
              <Boton as="button" variant="ghost" onClick={agregarVariante} className="rounded-lg px-3 text-sm">
                Agregar
              </Boton>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="font-display text-base font-semibold text-choco-900">{producto.name}</p>
            {producto.sinTacc && (
              <span className="rounded-full bg-oliva-light px-2 py-0.5 text-xs font-semibold text-oliva-dark">
                Sin TACC
              </span>
            )}
          </div>
          <span className={`text-xs font-semibold uppercase tracking-wide ${TEXTO_POR_ACENTO[acento]}`}>
            {producto.category}
          </span>
          {producto.descripcion && <p className="text-sm text-choco-600">{producto.descripcion}</p>}
          {producto.variantes.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {producto.variantes.map((v) => (
                <span key={v} className="rounded-full bg-crema-2 px-2 py-0.5 text-xs text-choco-600">
                  {v}
                </span>
              ))}
            </div>
          )}
          <p className="mt-1 font-display text-lg text-choco-900">${producto.price.toLocaleString('es-AR')}</p>
        </div>
      )}

      {/* Acciones */}
      <div className="flex shrink-0 flex-row items-center gap-3 sm:flex-col sm:items-end">
        {editing ? (
          <div className="flex gap-2">
            <button onClick={handleCancelar} className="text-sm text-choco-500 hover:text-choco-700">
              Cancelar
            </button>
            <Boton
              as="button"
              variant="mostaza"
              onClick={handleGuardar}
              disabled={saving}
              className="rounded-full px-4 py-1.5 text-sm"
            >
              {saving ? 'Guardando…' : 'Guardar'}
            </Boton>
          </div>
        ) : (
          <Boton as="button" variant="ghost" onClick={handleEditar} className="rounded-full px-4 py-1.5 text-sm">
            Editar
          </Boton>
        )}

        <label className="flex items-center gap-2 text-sm text-choco-600">
          <input
            type="checkbox"
            checked={producto.active}
            onChange={handleToggleActivo}
            className="h-4 w-4 accent-oliva"
          />
          {producto.active ? 'Activo' : 'Inactivo'}
        </label>

        <button onClick={handleEliminar} className="text-xs text-choco-400 hover:text-vino-dark">
          Eliminar
        </button>
      </div>
    </div>
  )
}
