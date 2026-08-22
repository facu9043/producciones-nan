import { useRef, useState } from 'react'
import { CATEGORIAS } from '../../data/categorias'
import { updateProducto, uploadProductoImage, deleteProducto } from '../../data/productosApi'
import Boton from '../Boton'

export default function ProductoRow({ producto, onChange, onDelete }) {
  const [draft, setDraft] = useState({
    name: producto.name,
    category: producto.category,
    price: producto.price,
    sinTacc: producto.sinTacc,
    descripcion: producto.descripcion,
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const dirty =
    draft.name !== producto.name ||
    draft.category !== producto.category ||
    Number(draft.price) !== producto.price ||
    draft.sinTacc !== producto.sinTacc ||
    draft.descripcion !== producto.descripcion

  async function handleGuardar() {
    setSaving(true)
    try {
      const actualizado = await updateProducto(producto.id, {
        ...draft,
        price: Number(draft.price) || 0,
      })
      onChange(actualizado)
    } finally {
      setSaving(false)
    }
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
      {/* Foto: drag&drop y click, siempre los dos */}
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

      {/* Campos editables */}
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
      </div>

      {/* Acciones */}
      <div className="flex shrink-0 flex-row items-center gap-3 sm:flex-col sm:items-end">
        <Boton
          as="button"
          variant="mostaza"
          onClick={handleGuardar}
          disabled={!dirty || saving}
          className="rounded-full px-4 py-1.5 text-sm"
        >
          {saving ? 'Guardando…' : 'Guardar'}
        </Boton>

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
