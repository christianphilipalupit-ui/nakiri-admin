import { useState } from 'react'

const palette = [
  ['nakiri', 'Nakiri Green', '#12ad63', '#d9efd8'], ['ocean', 'Ocean Blue', '#168db3', '#d9f0ef'], ['royal', 'Royal Blue', '#3d63c8', '#e0e8fb'], ['sky', 'Sky Blue', '#269fd0', '#e0f4fc'],
  ['purple', 'Purple', '#8055c7', '#eee5fb'], ['violet', 'Violet', '#a05ed0', '#f1e4fb'], ['pink', 'Pink', '#d35c9d', '#fbe4f1'], ['rose', 'Rose', '#c94f68', '#fbe3e7'],
  ['red', 'Red', '#d84c4c', '#fbe2e2'], ['orange', 'Orange', '#df761f', '#fff0de'], ['amber', 'Amber', '#c89319', '#fff4d6'], ['yellow', 'Yellow', '#a99d12', '#fffbd1'],
  ['lime', 'Lime', '#6f9d24', '#edf7d7'], ['emerald', 'Emerald', '#129568', '#d9f4e7'], ['teal', 'Teal', '#168f8a', '#d9f2f0'], ['cyan', 'Cyan', '#159db1', '#d9f3f7'],
  ['indigo', 'Indigo', '#5864bd', '#e5e7fb'], ['slate', 'Slate', '#637582', '#e7edf0'], ['coffee', 'Coffee', '#976848', '#f3e8df'], ['midnight', 'Midnight', '#4c75a8', '#dce7f6'],
  ['sakura', 'Sakura', '#d36eaa', '#f9e3f0'], ['neon', 'Neon', '#3abf56', '#dff9ce'],
].map(([id, name, accent, soft]) => ({ id, name, accent, soft, strong: accent, bg: soft, bgSecondary: `color-mix(in srgb, ${soft}, white 28%)`, surface: `color-mix(in srgb, ${soft}, white 48%)`, card: `color-mix(in srgb, ${soft}, white 68%)`, border: `color-mix(in srgb, ${accent}, white 72%)`, glow: `color-mix(in srgb, ${accent}, transparent 78%)` }))
export const themes = palette

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export default function Settings({ theme = 'nakiri', darkMode = false, onThemeChange, onDarkModeChange }) {
  const [profile, setProfile] = useState(() => read('nakiri-profile', { name: 'Christian', role: 'Administrator', about: '' }))
  const [notifications, setNotifications] = useState(() => read('nakiri-notifications', { projects: true, publishing: true, system: true }))
  const [portfolio, setPortfolio] = useState(() => localStorage.getItem('nakiri-portfolio-link') || 'https://nakiri.dev')
  const [notice, setNotice] = useState('')
  const feedback = message => { setNotice(message); window.setTimeout(() => setNotice(''), 2200) }
  const saveProfile = () => { localStorage.setItem('nakiri-profile', JSON.stringify(profile)); feedback('Profile saved') }
  const savePortfolio = () => { if (!/^https?:\/\/.+/.test(portfolio)) { feedback('Enter a valid URL, including https://'); return } localStorage.setItem('nakiri-portfolio-link', portfolio); feedback('Portfolio link saved') }
  const toggleNotification = key => { const next = { ...notifications, [key]: !notifications[key] }; setNotifications(next); localStorage.setItem('nakiri-notifications', JSON.stringify(next)); feedback('Notification preferences updated') }

  return (
    <div className="content settings-content">
      <div className="settings-header"><div><h1>Settings</h1><p>Personalize your admin workspace and portfolio preferences.</p></div></div>
      {notice && <div className="toast">✓ {notice}</div>}
      <p className="settings-intro">Keep your profile, appearance, notifications, and portfolio link up to date.</p>
      <div className="settings-form-grid">
        <section className="form-panel"><h2>Profile</h2><label className="form-field"><span>Name</span><input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} /></label><label className="form-field"><span>Role</span><input value={profile.role} onChange={e => setProfile({ ...profile, role: e.target.value })} /></label><label className="form-field"><span>About</span><textarea rows="3" value={profile.about} onChange={e => setProfile({ ...profile, about: e.target.value })} placeholder="A short profile introduction..." /></label><button className="primary settings-save" onClick={saveProfile}>Save Profile</button></section>
        <section className="form-panel appearance-panel"><h2>Appearance</h2><div className="theme-grid">{themes.map(item => <button key={item.id} className={`theme-card ${theme === item.id ? 'selected' : ''}`} onClick={() => onThemeChange(item.id)}><span style={{ background: `linear-gradient(120deg, ${item.soft}, ${item.accent})` }} /><strong>{item.name}</strong>{theme === item.id && <b>✓</b>}</button>)}</div><div className="theme-toggle"><div><strong>Dark Mode</strong><small>Use a darker workspace while keeping your accent theme.</small></div><button className={`switch ${darkMode ? 'on' : ''}`} onClick={() => onDarkModeChange(!darkMode)} aria-label="Toggle dark mode"><i /></button></div></section>
        <section className="form-panel"><h2>Notifications</h2>{[['projects', 'Project updates'], ['publishing', 'Content and publishing updates'], ['system', 'System notifications']].map(([key, label]) => <div className="toggle-row" key={key}><span>{label}</span><button className={`switch ${notifications[key] ? 'on' : ''}`} onClick={() => toggleNotification(key)} aria-label={`Toggle ${label}`}><i /></button></div>)}</section>
        <section className="form-panel"><h2>Portfolio Link</h2><label className="form-field"><span>Public URL</span><input value={portfolio} onChange={e => setPortfolio(e.target.value)} placeholder="https://your-portfolio.com" /></label><button className="primary settings-save" onClick={savePortfolio}>Save Portfolio Link</button></section>
      </div>
    </div>
  )
}
