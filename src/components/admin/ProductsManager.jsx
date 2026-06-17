import { useState } from 'react'
import {
  getProducts, getRooms,
  createProduct, updateProduct, deleteProduct,
} from '../../data/store.js'
import './ProductsManager.css'

const SIZE_PRESETS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']

const BLANK_PRODUCT = {
  id: '',
  roomId: null,
  name: '',
  description: '',
  price: '',
  currency: 'MAD',
  sizes: [],
  images: [''],
  inStock: true,
}

function ProductsManager() {
  const [products, setProducts] = useState(getProducts())
  const [rooms] = useState(getRooms())
  const [draft, setDraft] = useState(null)
  const [isNew, setIsNew] = useState(false)
  const [error, setError] = useState('')

  function refresh() {
    setProducts(getProducts())
  }

  function roomName(roomId) {
    if (!roomId) return 'ERRO Universe'
    const r = rooms.find(x => x.id === roomId)
    return r ? r.name : 'Unknown room'
  }

  function startNew() {
    setDraft({ ...BLANK_PRODUCT, images: [''] })
    setIsNew(true)
    setError('')
  }

  function startEdit(product) {
    setDraft({
      ...product,
      images: product.images && product.images.length ? [...product.images] : [''],
      sizes: [...(product.sizes || [])],
    })
    setIsNew(false)
    setError('')
  }

  function cancel() {
    setDraft(null)
    setIsNew(false)
    setError('')
  }

  function setField(field, value) {
    setDraft({ ...draft, [field]: value })
  }

  function toggleSize(size) {
    const has = draft.sizes.includes(size)
    setField('sizes', has
      ? draft.sizes.filter(s => s !== size)
      : [...draft.sizes, size])
  }

  function save() {
    if (!draft.name.trim()) { setError('Name is required.'); return }
    if (draft.price === '' || isNaN(Number(draft.price))) { setError('Valid price is required.'); return }
    if (draft.sizes.length === 0) { setError('Pick at least one size.'); return }

    const clean = {
      ...draft,
      price: Number(draft.price),
      images: draft.images.filter(img => img.trim() !== ''),
      roomId: draft.roomId || null,
    }
    if (clean.images.length === 0) clean.images = ['']

    if (isNew) {
      createProduct(clean)
    } else {
      updateProduct(draft.id, clean)
    }
    refresh()
    cancel()
  }

  function remove(product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    deleteProduct(product.id)
    refresh()
    cancel()
  }

  // ── EDIT / CREATE FORM ───────────────────────────────────────
  if (draft) {
    return (
      <div className="pm">
        <div className="pm__form-header">
          <h2 className="pm__title">{isNew ? 'New Product' : `Edit — ${draft.name}`}</h2>
          <button className="pm__cancel" onClick={cancel}>← Back to list</button>
        </div>

        <div className="pm__form-grid">

          {/* LEFT */}
          <div className="pm__col">
            <div className="pm-field">
              <label>Name</label>
              <input value={draft.name} onChange={e => setField('name', e.target.value)} placeholder="Signal Jacket" />
            </div>

            <div className="pm-field">
              <label>Description</label>
              <textarea rows={4} value={draft.description} onChange={e => setField('description', e.target.value)} placeholder="A structured oversized jacket..." />
            </div>

            <div className="pm-field pm-field--row">
              <div>
                <label>Price</label>
                <input value={draft.price} onChange={e => setField('price', e.target.value)} placeholder="890" />
              </div>
              <div>
                <label>Currency</label>
                <input value={draft.currency} onChange={e => setField('currency', e.target.value)} placeholder="MAD" />
              </div>
            </div>

            <div className="pm-field">
              <label>Location</label>
              <select
                value={draft.roomId || ''}
                onChange={e => setField('roomId', e.target.value || null)}
                className="pm-select"
              >
                <option value="">ERRO Universe (no room)</option>
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* RIGHT */}
          <div className="pm__col">
            <div className="pm-field">
              <label>Image</label>
              <div className="pm-image-preview">
                {draft.images[0]
                  ? <img src={draft.images[0]} alt="preview" />
                  : <span>No image</span>}
              </div>
              <input
                value={draft.images[0]}
                onChange={e => setField('images', [e.target.value])}
                placeholder="https://..."
              />
              <span className="pm-field__hint">Paste an image link. AI image generation comes later.</span>
            </div>

            <div className="pm-field">
              <label>Sizes</label>
              <div className="pm-sizes">
                {SIZE_PRESETS.map(size => (
                  <button
                    key={size}
                    className={draft.sizes.includes(size) ? 'pm-size--active' : ''}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pm-field">
              <label>Availability</label>
              <button
                className={`pm-stock ${draft.inStock ? 'pm-stock--in' : 'pm-stock--out'}`}
                onClick={() => setField('inStock', !draft.inStock)}
              >
                {draft.inStock ? 'In Stock' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>

        {error && <p className="pm__error">{error}</p>}

        <div className="pm__form-actions">
          <button className="pm__save" onClick={save}>
            {isNew ? 'Create Product' : 'Save Changes'}
          </button>
          {!isNew && (
            <button className="pm__delete" onClick={() => remove(draft)}>Delete Product</button>
          )}
        </div>
      </div>
    )
  }

  // ── LIST VIEW ────────────────────────────────────────────────
  return (
    <div className="pm">
      <div className="pm__header">
        <h2 className="pm__title">Products</h2>
        <button className="pm__new" onClick={startNew}>+ New Product</button>
      </div>

      {products.length === 0 ? (
        <p className="pm__empty">No products yet. Create one to get started.</p>
      ) : (
        <div className="pm__list">
          {products.map(product => (
            <div key={product.id} className="pm-card" onClick={() => startEdit(product)}>
              <div className="pm-card__image">
                {product.images && product.images[0]
                  ? <img src={product.images[0]} alt={product.name} />
                  : <span>No image</span>}
                {!product.inStock && <span className="pm-card__out">Out</span>}
              </div>
              <div className="pm-card__info">
                <p className="pm-card__name">{product.name}</p>
                <p className="pm-card__price">{product.price} {product.currency}</p>
                <span className="pm-card__location">{roomName(product.roomId)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsManager