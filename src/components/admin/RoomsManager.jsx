import { useState, useEffect } from 'react'
import { roomsApi } from '../../api/client.js'
import './RoomsManager.css'

const BLANK_ROOM = {
  id: '',
  name: '',
  tagline: '',
  mood: '',
  status: 'open',
  bg: '',
  colors: {
    accent:  '#c8a96e',
    surface: '#0d0a07',
    text:    '#e0d5c5',
    muted:   '#6b5a3a',
    border:  '#2a2015',
  },
  products: [],
}

function slugify(text) {
  return text.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

function RoomsManager() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRooms()
  }, [])

  function loadRooms() {
    setLoading(true)
    roomsApi.getAll()
      .then(setRooms)
      .catch(err => console.error('Failed to load rooms:', err))
      .finally(() => setLoading(false))
  }
  const [draft, setDraft] = useState(null)   // null = list view
  const [isNew, setIsNew] = useState(false)
  const [error, setError] = useState('')

  function refresh() {
    loadRooms()
  }

  function startNew() {
    setDraft({ ...BLANK_ROOM, colors: { ...BLANK_ROOM.colors } })
    setIsNew(true)
    setError('')
  }

  function startEdit(room) {
    setDraft({ ...room, colors: { ...room.colors } })
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

  function setColor(key, value) {
    setDraft({ ...draft, colors: { ...draft.colors, [key]: value } })
  }

  async function save() {
    if (!draft.name.trim()) {
      setError('Name is required.')
      return
    }

    try {
      if (isNew) {
        const id = slugify(draft.name)
        if (!id) { setError('Name must contain letters or numbers.'); return }
        if (rooms.some(r => r.id === id)) {
          setError('A room with this name already exists.')
          return
        }
        await roomsApi.create({ ...draft, id })
      } else {
        await roomsApi.update(draft.id, draft)
      }
      refresh()
      cancel()
    } catch (err) {
      setError(err.message)
    }
  }

  async function remove(room) {
    if (!window.confirm(`Delete "${room.name}"? This cannot be undone.`)) return
    try {
      await roomsApi.remove(room.id)
      refresh()
      cancel()
    } catch (err) {
      setError(err.message)
    }
  }
  // ── EDIT / CREATE FORM ───────────────────────────────────────
  if (draft) {
    return (
      <div className="rm">
        <div className="rm__form-header">
          <h2 className="rm__title">{isNew ? 'New Room' : `Edit — ${draft.name}`}</h2>
          <button className="rm__cancel" onClick={cancel}>← Back to list</button>
        </div>

        <div className="rm__form">
          <div className="rm__form-grid">

            {/* LEFT — text fields */}
            <div className="rm__col">
              <div className="rm-field">
                <label>Name</label>
                <input value={draft.name} onChange={e => setField('name', e.target.value)} placeholder="Void Protocol" />
              </div>

              <div className="rm-field">
                <label>Tagline</label>
                <input value={draft.tagline} onChange={e => setField('tagline', e.target.value)} placeholder="Where silence has a shape." />
              </div>

              <div className="rm-field">
                <label>Mood / Description</label>
                <textarea rows={3} value={draft.mood} onChange={e => setField('mood', e.target.value)} placeholder="Cold. Minimal. Like the inside of a forgotten satellite." />
              </div>

              <div className="rm-field">
                <label>Status</label>
                <div className="rm-status">
                  <button
                    className={draft.status === 'open' ? 'rm-status--active' : ''}
                    onClick={() => setField('status', 'open')}
                  >Open</button>
                  <button
                    className={draft.status === 'coming-soon' ? 'rm-status--active' : ''}
                    onClick={() => setField('status', 'coming-soon')}
                  >Coming Soon</button>
                </div>
              </div>

              <div className="rm-field">
                <label>Background Image URL</label>
                <input value={draft.bg} onChange={e => setField('bg', e.target.value)} placeholder="https://..." />
                <span className="rm-field__hint">Paste any image link. AI image generation comes later.</span>
              </div>
            </div>

            {/* RIGHT — preview + colors */}
            <div className="rm__col">
              <div className="rm-field">
                <label>Preview</label>
                <div
                  className="rm-preview"
                  style={{
                    backgroundColor: draft.colors.surface,
                    backgroundImage: draft.bg ? `url(${draft.bg})` : 'none',
                    borderColor: draft.colors.border,
                  }}
                >
                  <div className="rm-preview__overlay" />
                  <div className="rm-preview__content">
                    <span style={{ color: draft.colors.accent }} className="rm-preview__eyebrow">Drop</span>
                    <h3 style={{ color: draft.colors.text }} className="rm-preview__name">{draft.name || 'Room Name'}</h3>
                    <p style={{ color: draft.colors.muted }} className="rm-preview__tag">{draft.tagline || 'Tagline shows here'}</p>
                  </div>
                </div>
              </div>

              <div className="rm-field">
                <label>Colors</label>
                <div className="rm-colors">
                  {['accent', 'surface', 'text', 'muted', 'border'].map(key => (
                    <div key={key} className="rm-color">
                      <input
                        type="color"
                        value={draft.colors[key]}
                        onChange={e => setColor(key, e.target.value)}
                      />
                      <div className="rm-color__meta">
                        <span className="rm-color__name">{key}</span>
                        <span className="rm-color__hex">{draft.colors[key]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {error && <p className="rm__error">{error}</p>}

          <div className="rm__form-actions">
            <button className="rm__save" onClick={save}>
              {isNew ? 'Create Room' : 'Save Changes'}
            </button>
            {!isNew && (
              <button className="rm__delete" onClick={() => remove(draft)}>Delete Room</button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── LIST VIEW ────────────────────────────────────────────────
  return (
    <div className="rm">
      <div className="rm__header">
        <h2 className="rm__title">Rooms</h2>
        <button className="rm__new" onClick={startNew}>+ New Room</button>
      </div>

      <div className="rm__list">
        {rooms.map(room => (
          <div key={room.id} className="rm-card" onClick={() => startEdit(room)}>
            <div
              className="rm-card__bg"
              style={{
                backgroundColor: room.colors.surface,
                backgroundImage: room.bg ? `url(${room.bg})` : 'none',
              }}
            >
              <div className="rm-card__swatches">
                <span style={{ backgroundColor: room.colors.accent }} />
                <span style={{ backgroundColor: room.colors.text }} />
                <span style={{ backgroundColor: room.colors.muted }} />
              </div>
            </div>
            <div className="rm-card__info">
              <div>
                <p className="rm-card__name">{room.name}</p>
                <p className="rm-card__tag">{room.tagline}</p>
              </div>
              <span className={`rm-card__status rm-card__status--${room.status}`}>
                {room.status === 'open' ? 'Open' : 'Soon'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomsManager