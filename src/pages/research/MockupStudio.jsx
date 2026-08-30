import { useMemo, useState } from 'react'

const localMockupFiles = import.meta.glob('../../assets/mockups/**/*.{png,svg}', {
  eager: true,
  import: 'default',
  query: '?url',
})

const mockupAssetConfig = {
  'T-Shirt': { folder: 'tshirt', prefix: 'tshirt' },
  Hoodie: { folder: 'hoodie', prefix: 'hoodie' },
  Mug: { folder: 'mug', prefix: 'mug' },
  'Tote Bag': { folder: 'tote', prefix: 'tote' },
  Sticker: { folder: 'sticker', prefix: 'sticker' },
}

const products = ['T-Shirt', 'Hoodie', 'Mug', 'Tote Bag', 'Sticker']
const views = ['Front', 'Back', 'Flat Lay']
const colors = [
  { name: 'Black', value: '#17191a' },
  { name: 'White', value: '#f4f3ee' },
  { name: 'Navy', value: '#18263d' },
  { name: 'Red', value: '#762f38' },
  { name: 'Green', value: '#3c5946' },
  { name: 'Blue', value: '#1f5e9c' },
  { name: 'Cream', value: '#ded3bf' },
]
const placementPresets = {
  'Top Left': { x: -24, y: -24 }, 'Top Center': { x: 0, y: -24 }, 'Top Right': { x: 24, y: -24 },
  'Middle Left': { x: -24, y: 0 }, Center: { x: 0, y: 0 }, 'Middle Right': { x: 24, y: 0 },
  'Bottom Left': { x: -24, y: 24 }, 'Bottom Center': { x: 0, y: 24 }, 'Bottom Right': { x: 24, y: 24 },
}
const appearanceModes = [
  { value: 'original', label: 'Original', description: 'As uploaded' },
  { value: 'enhanced', label: 'Enhanced Contrast', description: 'Subtle visibility boost' },
  { value: 'light-garment', label: 'Light Garment', description: 'For white and light colors' },
  { value: 'dark-garment', label: 'Dark Garment', description: 'For black and dark colors' },
]
const printInkModes = [
  { value: 'original', label: 'Original Colors' },
  { value: 'auto', label: 'Auto Contrast' },
  { value: 'black', label: 'Black Ink' },
  { value: 'white', label: 'White Ink' },
  { value: 'custom', label: 'Custom Ink' },
]

function readBriefContext() {
  try {
    const stored = sessionStorage.getItem('nakiri-design-brief-draft')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function readMockupConfig() {
  try {
    const stored = sessionStorage.getItem('nakiri-mockup-config')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function readMockupLibrary() {
  try {
    const stored = sessionStorage.getItem('nakiri-mockup-library')
    const items = stored ? JSON.parse(stored) : []
    return Array.isArray(items) ? items : []
  } catch {
    return []
  }
}

function getMockupAsset(product, colorName, view) {
  const config = mockupAssetConfig[product]
  if (!config) return null

  const color = colorName.toLowerCase().replaceAll(' ', '-')
  const viewName = view.toLowerCase().replaceAll(' ', '-')
  const fileCandidates = [
    `${config.prefix}-${color}-${viewName}.png`,
    `${config.prefix}-${color}-${viewName}.svg`,
    `${config.prefix}-${color}.png`,
    `${config.prefix}-${color}.svg`,
  ]

  const assetEntry = Object.entries(localMockupFiles).find(([path]) => {
    return fileCandidates.some(file => path.endsWith(`/${config.folder}/${file}`))
  })

  return assetEntry?.[1] || null
}

function DesignPreview({ designImage, appearanceMode, printInkMode, inkColor }) {
  if (!designImage || printInkMode === 'original') {
    return <img src={designImage} alt="Design overlay" />
  }

  return (
    <span
      className={`design-ink-preview appearance-${appearanceMode}`}
      style={{
        '--ink-color': inkColor,
        maskImage: `url("${designImage}")`,
        WebkitMaskImage: `url("${designImage}")`,
      }}
      role="img"
      aria-label="Design ink preview"
    />
  )
}

function AssetProductMockup({ product, asset, designImage, designTitle, mockupStyle, texture, shadows, appearanceMode, printInkMode, inkColor }) {
  return (
    <div className={`mockup-product asset-mockup ${product.toLowerCase().replaceAll(' ', '-')} ${texture ? 'textured' : ''} ${shadows ? 'with-shadows' : ''}`}>
      <img className="mockup-asset-image" src={asset} alt={`${product} mockup`} />
      <div className={`asset-design-overlay appearance-${appearanceMode}`} style={mockupStyle}>
        {designImage ? <DesignPreview designImage={designImage} appearanceMode={appearanceMode} printInkMode={printInkMode} inkColor={inkColor} /> : <><strong>{designTitle.split(' ').slice(0, 2).join(' ').toUpperCase()}</strong><span>☕</span><strong>{designTitle.split(' ').slice(2).join(' ').toUpperCase() || 'CODE'}</strong></>}
      </div>
    </div>
  )
}

function FallbackProductMockup({ product, designImage, designTitle, mockupStyle, texture, shadows, selectedColor, appearanceMode, printInkMode, inkColor }) {
  const renderDesign = () => (
    <div className={`svg-design-overlay appearance-${appearanceMode}`} style={mockupStyle}>
      {designImage ? <DesignPreview designImage={designImage} appearanceMode={appearanceMode} printInkMode={printInkMode} inkColor={inkColor} /> : <><strong>{designTitle.split(' ').slice(0, 2).join(' ').toUpperCase()}</strong><span>☕</span><strong>{designTitle.split(' ').slice(2).join(' ').toUpperCase() || 'CODE'}</strong></>}
    </div>
  )

  if (product === 'T-Shirt') {
    return <div className={`mockup-product svg-mockup ${texture ? 'textured' : ''} ${shadows ? 'with-shadows' : ''}`} style={{ '--product-color': selectedColor }}><svg className="product-svg" viewBox="0 0 500 620" role="img" aria-label="T-shirt mockup"><path className="garment" d="M160 45 215 25c15 18 55 18 70 0l55 20 105 75-54 104-47-37v382H156V187l-47 37-54-104Z" /><path className="garment-detail" d="M215 25c15 18 55 18 70 0M156 187v382M344 187v382" /><path className="collar" d="M202 31c8 42 88 42 96 0" /></svg>{renderDesign()}</div>
  }

  if (product === 'Hoodie') {
    return <div className={`mockup-product svg-mockup hoodie-svg-mockup ${texture ? 'textured' : ''} ${shadows ? 'with-shadows' : ''}`} style={{ '--product-color': selectedColor }}><svg className="product-svg" viewBox="0 0 500 680" role="img" aria-label="Hoodie mockup"><path className="garment" d="M151 116 207 78c9 35 77 35 86 0l56 38 106 80-55 122-48-37v345H148V281l-57 37-54-122Z" /><path className="hood" d="M207 78c4-43 82-43 86 0l-18 65h-50Z" /><path className="hood-opening" d="M220 91c9 22 51 22 60 0" /><path className="cuff" d="m37 346 55-28 17 40-51 31Z M463 346l-55-28-17 40 51 31Z" /><path className="pocket" d="M180 480c35 28 105 28 140 0v80H180Z" /><path className="garment-detail" d="M148 281v345M352 281v345M180 560h140" /></svg>{renderDesign()}</div>
  }

  if (product === 'Mug') {
    return <div className={`mockup-product svg-mockup mug-svg-mockup ${texture ? 'textured' : ''} ${shadows ? 'with-shadows' : ''}`} style={{ '--product-color': selectedColor }}><svg className="product-svg" viewBox="0 0 520 420" role="img" aria-label="Mug mockup"><path className="handle" d="M375 135h55c81 0 81 142 0 142h-55v-39h48c36 0 36-64 0-64h-48Z" /><path className="garment" d="M90 80c0-18 22-32 49-32h172c27 0 49 14 49 32v236c0 24-22 43-49 43H139c-27 0-49-19-49-43Z" /><path className="mug-rim" d="M90 80c0 18 49 31 135 31s135-13 135-31-49-32-135-32S90 62 90 80Z" /><path className="garment-detail" d="M91 80c0 20 48 34 134 34s134-14 134-34M91 310c0 22 48 39 134 39s134-17 134-39" /></svg>{renderDesign()}</div>
  }

  return <div className={`mockup-product ${product.toLowerCase().replace(' ', '-')} ${texture ? 'textured' : ''} ${shadows ? 'with-shadows' : ''}`} style={{ '--product-color': selectedColor }}><div className="product-shape"><div className={`product-design appearance-${appearanceMode}`} style={mockupStyle}>{designImage ? <DesignPreview designImage={designImage} appearanceMode={appearanceMode} printInkMode={printInkMode} inkColor={inkColor} /> : <><strong>{designTitle.split(' ').slice(0, 2).join(' ').toUpperCase()}</strong><span>☕</span><strong>{designTitle.split(' ').slice(2).join(' ').toUpperCase() || 'CODE'}</strong></>}</div></div></div>
}

function ProductMockup(props) {
  const asset = getMockupAsset(props.product, props.colorName, props.view)

  if (asset) {
    return <AssetProductMockup {...props} asset={asset} />
  }

  return <FallbackProductMockup {...props} />
}

function MockupStudio({ onBack, onOpenLibrary }) {
  const [context] = useState(readBriefContext)
  const [savedConfig] = useState(readMockupConfig)
  const [product, setProduct] = useState(() => savedConfig?.product || 'T-Shirt')
  const [view, setView] = useState(() => savedConfig?.view || 'Front')
  const [color, setColor] = useState(() => colors.find(item => item.name === savedConfig?.color) || colors[0])
  const [fit, setFit] = useState(() => savedConfig?.fit || 'Regular Fit')
  const [tool, setTool] = useState('Select')
  const [placement, setPlacement] = useState(() => savedConfig?.placement || { x: 0, y: 0, scale: 72, rotation: 0 })
  const [shadows, setShadows] = useState(() => savedConfig?.shadows ?? true)
  const [texture, setTexture] = useState(() => savedConfig?.texture ?? true)
  const [zoom, setZoom] = useState(100)
  const [designImage, setDesignImage] = useState(() => savedConfig?.designImage || '')
  const [appearanceMode, setAppearanceMode] = useState(() => savedConfig?.appearanceMode || 'original')
  const [printInkMode, setPrintInkMode] = useState(() => savedConfig?.printInkMode || 'original')
  const [customInkColor, setCustomInkColor] = useState(() => savedConfig?.customInkColor || '#1f2937')
  const [fileName, setFileName] = useState(() => savedConfig?.fileName || 'coffee_code_v1.png')
  const [feedback, setFeedback] = useState('')

  const activeContext = savedConfig?.context || context
  const designTitle = activeContext?.title || 'Coffee Code Repeat'
  const designText = activeContext?.opportunity?.title || designTitle
  const selectedColor = color.value
  const inkColor = useMemo(() => {
    if (printInkMode === 'black') return '#111827'
    if (printInkMode === 'white') return '#ffffff'
    if (printInkMode === 'custom') return customInkColor
    if (printInkMode === 'auto') {
      return ['White', 'Cream', 'Yellow'].includes(color.name) ? '#111827' : '#ffffff'
    }
    return null
  }, [color.name, customInkColor, printInkMode])
  const mockupStyle = useMemo(() => ({
    transform: `translate(${placement.x}%, ${placement.y}%) scale(${placement.scale / 72}) rotate(${placement.rotation}deg)`,
  }), [placement])

  const showFeedback = message => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 2500)
  }

  const updatePlacement = (field, value) => {
    setPlacement(current => ({ ...current, [field]: Number(value) }))
  }

  const selectPreset = preset => {
    setPlacement(current => ({ ...current, ...placementPresets[preset] }))
  }

  const resetPlacement = () => {
    setPlacement({ x: 0, y: 0, scale: 72, rotation: 0 })
    setZoom(100)
    showFeedback('Mockup placement reset')
  }

  const handleDesignUpload = event => {
    const file = event.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setDesignImage(URL.createObjectURL(file))
    showFeedback('Design selected for this mockup')
  }

  const saveMockup = () => {
    const config = { product, view, color: color.name, fit, placement, shadows, texture, fileName, designImage, appearanceMode, printInkMode, customInkColor, context: activeContext }
    const existing = readMockupLibrary()
    const libraryItem = { ...config, id: `mockup-${Date.now()}`, title: `${designTitle} Mockup`, design: designTitle, updated: new Date().toISOString(), created: new Date().toISOString(), status: 'Draft', tags: ['New', product] }
    sessionStorage.setItem('nakiri-mockup-config', JSON.stringify(config))
    sessionStorage.setItem('nakiri-mockup-library', JSON.stringify([libraryItem, ...existing]))
    showFeedback('Mockup saved temporarily')
  }

  if (!activeContext) {
    return <section className="content mockup-empty-page"><div className="form-panel"><span className="research-empty-icon">▧</span><h1>No Design Brief selected</h1><p>Open Mockup Studio from a Design Brief to start placing your design on a product.</p><button className="primary" type="button" onClick={onBack}>← Back to Design Brief</button></div></section>
  }

  return (
    <section className="content mockup-content">
      <div className="mockup-breadcrumb"><button type="button" onClick={onBack}>Research Tools</button><span>›</span><button type="button" onClick={onBack}>Design Briefs</button><span>›</span><span>{designText}</span><span>›</span><span>Mockup Studio</span></div>
      <div className="mockup-heading"><div><h1>Mockup Studio</h1><p>Preview your original design on products with realistic mockups.</p></div><div className="mockup-heading-actions"><select value={product} onChange={event => setProduct(event.target.value)} aria-label="Select product">{products.map(item => <option key={item}>{item}</option>)}</select><button className="secondary" type="button" onClick={saveMockup}>▱ &nbsp; Save Mockup</button><button className="secondary" type="button" onClick={onOpenLibrary}>▦ &nbsp; Library</button><button className="secondary" type="button" onClick={() => showFeedback('Download prepared')}>⇩ &nbsp; Download</button><button className="primary" type="button" onClick={() => showFeedback('Export image prepared')}>▧ &nbsp; Export Image →</button></div></div>

      <div className="mockup-layout"><aside className="mockup-left"><section className="form-panel mockup-control-panel"><h2>1. Your Design</h2><p>Upload or select your design.</p><label className="mockup-upload"><input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleDesignUpload} /><span>♧</span><strong>Upload Design</strong><small>PNG, JPG, SVG (Max 10MB)</small></label><div className="uploaded-design"><div className="uploaded-thumb">{designImage ? <img src={designImage} alt="Selected design" /> : '☕'}</div><div><strong>{fileName}</strong><small>2000 × 2000px</small></div><b>✓</b></div><div className="design-appearance"><div><h3>Design Appearance</h3><p>Preview-only artwork adjustments.</p></div><div className="appearance-options">{appearanceModes.map(mode => <button className={appearanceMode === mode.value ? 'selected' : ''} type="button" key={mode.value} onClick={() => setAppearanceMode(mode.value)}><strong>{mode.label}</strong><small>{mode.description}</small></button>)}</div></div><div className="print-ink-preview"><div><h3>Print Ink Preview</h3><p>Preview-only ink treatment.</p></div><div className="ink-options">{printInkModes.map(mode => <button className={printInkMode === mode.value ? 'selected' : ''} type="button" key={mode.value} onClick={() => setPrintInkMode(mode.value)}><strong>{mode.label}</strong></button>)}</div>{printInkMode === 'custom' && <label className="custom-ink-picker"><span>Ink color</span><input type="color" value={customInkColor} onChange={event => setCustomInkColor(event.target.value)} /></label>}</div></section><section className="form-panel mockup-control-panel"><h2>2. Product</h2><p>Choose a product to preview.</p>{products.map(item => <button className={`product-choice ${product === item ? 'selected' : ''}`} type="button" key={item} onClick={() => setProduct(item)}><span>{item === 'T-Shirt' ? '♧' : item === 'Hoodie' ? '♢' : item === 'Mug' ? '▢' : item === 'Tote Bag' ? '▱' : '◇'}</span>{item}{product === item && <b>✓</b>}</button>)}</section><section className="form-panel mockup-control-panel"><h2>3. Mockup Style</h2><p>Select mockup view.</p><div className="mockup-view-grid">{views.map(item => <button className={view === item ? 'selected' : ''} type="button" key={item} onClick={() => setView(item)}><span className={`view-icon ${item.toLowerCase().replace(' ', '-')}`} />{item}</button>)}</div></section></aside>

        <main className="mockup-workspace"><div className="mockup-canvas"><div className="mockup-tool-panel">{['Select', 'Move', 'Scale', 'Rotate', 'Reset'].map(item => <button className={tool === item ? 'selected' : ''} type="button" key={item} onClick={() => item === 'Reset' ? resetPlacement() : setTool(item)}><span>{item === 'Select' ? '⌁' : item === 'Move' ? '✣' : item === 'Scale' ? '⤢' : item === 'Rotate' ? '◴' : '↶'}</span>{item}</button>)}</div><button className="compare-button" type="button">◫ &nbsp; Compare</button><ProductMockup product={product} colorName={color.name} view={view} designImage={designImage} designTitle={designTitle} mockupStyle={mockupStyle} texture={texture} shadows={shadows} selectedColor={selectedColor} appearanceMode={appearanceMode} printInkMode={printInkMode} inkColor={inkColor} /><div className="canvas-controls"><button type="button" onClick={() => showFeedback('Undo is available for placement changes')}>↶</button><button type="button" onClick={() => showFeedback('Redo is available for placement changes')}>↷</button><button type="button" onClick={() => setZoom(current => Math.max(50, current - 10))}>−</button><span>{zoom}%</span><button type="button" onClick={() => setZoom(current => Math.min(150, current + 10))}>＋</button><button type="button" onClick={() => showFeedback('Fullscreen preview is not available yet')}>⛶</button></div></div><div className="color-selector"><strong>Product Color</strong><div>{colors.map(item => <button className={color.name === item.name ? 'selected' : ''} type="button" key={item.name} onClick={() => setColor(item)}><span style={{ background: item.value }} />{item.name}</button>)}</div></div></main>

        <aside className="mockup-right"><section className="form-panel mockup-side-panel"><h2>Design Placement</h2><div className="placement-presets">{Object.keys(placementPresets).map(preset => <button className={placementPresets[preset].x === placement.x && placementPresets[preset].y === placement.y ? 'selected' : ''} type="button" key={preset} onClick={() => selectPreset(preset)} aria-label={preset}>●</button>)}</div><div className="placement-fields"><label><span>X Position</span><input type="number" value={placement.x} onChange={event => updatePlacement('x', event.target.value)} /><small>%</small></label><label><span>Y Position</span><input type="number" value={placement.y} onChange={event => updatePlacement('y', event.target.value)} /><small>%</small></label></div><label className="mockup-range"><span>Size <b>{placement.scale}%</b></span><input type="range" min="30" max="150" value={placement.scale} onChange={event => updatePlacement('scale', event.target.value)} /><small><i>30%</i><i>150%</i></small></label><label className="mockup-range"><span>Rotate <b>{placement.rotation}°</b></span><input type="range" min="-180" max="180" value={placement.rotation} onChange={event => updatePlacement('rotation', event.target.value)} /><small><i>-180°</i><i>180°</i></small></label></section><section className="form-panel mockup-side-panel"><h2>Product Options</h2><label className="mockup-option"><span>Fabric Color</span><select value={color.name} onChange={event => setColor(colors.find(item => item.name === event.target.value))}>{colors.map(item => <option key={item.name}>{item.name}</option>)}</select></label><label className="mockup-option"><span>Fit Style</span><select value={fit} onChange={event => setFit(event.target.value)}><option>Regular Fit</option><option>Oversized</option><option>Slim Fit</option></select></label><label className="mockup-toggle"><span>Shadows</span><button className={shadows ? 'on' : ''} type="button" onClick={() => setShadows(current => !current)}><i /></button></label><label className="mockup-toggle"><span>Realistic Fabric Texture</span><button className={texture ? 'on' : ''} type="button" onClick={() => setTexture(current => !current)}><i /></button></label></section><section className="form-panel mockup-side-panel"><h2>Mockup Info</h2><p>Product <b>{product}</b></p><p>Color <b>{color.name}</b></p><p>View <b>{view}</b></p><p>Mockup <b>Premium Quality</b></p></section><div className="mockup-tip">♧ &nbsp; Tip: Use high resolution files (2000px or more) for the best print quality.</div></aside></div>
      {feedback && <div className="saved-feedback">{feedback}</div>}
    </section>
  )
}

export default MockupStudio
