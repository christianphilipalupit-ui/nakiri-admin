import { useState } from 'react'

import './styles.css'

import Sidebar from './components/layout/Sidebar.jsx'
import Topbar from './components/layout/Header.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BlogEditor from './pages/blog/BlogEditor.jsx'
import BlogPosts from './pages/blog/BlogPosts.jsx'
import ProjectEditor from './pages/projects/ProjectEditor.jsx'
import Projects from './pages/projects/Projects.jsx'
import ResearchDashboard from './pages/research/ResearchDashboard.jsx'
import NicheTrendSearch from './pages/research/NicheTrendSearch.jsx'
import ResearchResults from './pages/research/ResearchResults.jsx'
import SavedResearch from './pages/research/SavedResearch.jsx'
import DesignDetail from './pages/research/DesignDetail.jsx'
import Settings, { themes } from './pages/settings/Settings.jsx'
import SkillEditor from './pages/skills/SkillEditor.jsx'
import Skills from './pages/skills/Skills.jsx'
import SocialPostEditor from './pages/social/SocialPostEditor.jsx'
import SocialPosts from './pages/social/SocialPosts.jsx'
import Technologies from './pages/technologies/Technologies.jsx'
import TechnologyEditor from './pages/technologies/TechnologyEditor.jsx'

const editorParentPages = {
  ProjectEditor: 'Projects',
  BlogEditor: 'Blog Posts',
  SocialEditor: 'Social Posts',
  TechnologyEditor: 'Technologies',
  TechnologyEditorEdit: 'Technologies',
  SkillEditor: 'Skills',
  SkillEditorEdit: 'Skills',
  NicheTrendSearch: 'Research / Trending',
  ResearchResults: 'Research / Trending',
  DesignDetail: 'Research / Trending',
  SavedResearch: 'Research / Trending',
}

function App() {
  const [active, setActive] = useState('Dashboard')
  const [open, setOpen] = useState(false)
  const [editor, setEditor] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('nakiri-theme') || 'nakiri')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('nakiri-dark-mode') === 'true')

  const page = editor || active
  const themeConfig = themes.find(item => item.id === theme) || themes[0]
  const sidebarPage = editorParentPages[editor] || active

  const selectPage = pageName => {
    setEditor(null)
    setActive(pageName)
  }

  const openEditor = editorName => {
    setEditor(editorName)
  }

  const applyTheme = themeId => {
    setTheme(themeId)
    localStorage.setItem('nakiri-theme', themeId)
  }

  const applyDarkMode = enabled => {
    setDarkMode(enabled)
    localStorage.setItem('nakiri-dark-mode', String(enabled))
  }

  const renderPage = () => {
    if (page === 'Dashboard') {
      return <Dashboard onNewProject={() => openEditor('ProjectEditor')} onNewPost={() => openEditor('BlogEditor')} onNewSocialPost={() => openEditor('SocialEditor')} />
    }

    if (page === 'Projects') {
      return <Projects onNewProject={() => openEditor('ProjectEditor')} onEditProject={() => openEditor('ProjectEditor')} />
    }

    if (page === 'Research / Trending') {
      return <ResearchDashboard onNewResearch={() => openEditor('NicheTrendSearch')} onOpenSavedResearch={() => openEditor('SavedResearch')} />
    }

    if (page === 'NicheTrendSearch') {
      return <NicheTrendSearch onBack={() => selectPage('Research / Trending')} onStartResearch={() => openEditor('ResearchResults')} />
    }

    if (page === 'ResearchResults') {
      return <ResearchResults onNewResearch={() => openEditor('NicheTrendSearch')} onBack={() => selectPage('Research / Trending')} onOpenResult={() => openEditor('DesignDetail')} />
    }

    if (page === 'DesignDetail') {
      return <DesignDetail onResults={() => openEditor('ResearchResults')} onBack={() => openEditor('ResearchResults')} />
    }

    if (page === 'SavedResearch') {
      return <SavedResearch onBackToResearch={() => selectPage('Research / Trending')} />
    }

    if (page === 'ProjectEditor') {
      return <ProjectEditor editing={false} onBack={() => selectPage('Projects')} />
    }

    if (page === 'Blog Posts') {
      return <BlogPosts onNewPost={() => openEditor('BlogEditor')} onEditPost={() => openEditor('BlogEditor')} />
    }

    if (page === 'BlogEditor') {
      return <BlogEditor editing={false} onBack={() => selectPage('Blog Posts')} />
    }

    if (page === 'Social Posts') {
      return <SocialPosts onCreate={() => openEditor('SocialEditor')} onEdit={() => openEditor('SocialEditor')} />
    }

    if (page === 'SocialEditor') {
      return <SocialPostEditor editing={false} onBack={() => selectPage('Social Posts')} />
    }

    if (page === 'Technologies') {
      return <Technologies onCreate={() => openEditor('TechnologyEditor')} onEdit={() => openEditor('TechnologyEditorEdit')} />
    }

    if (page === 'TechnologyEditor' || page === 'TechnologyEditorEdit') {
      return <TechnologyEditor editing={page === 'TechnologyEditorEdit'} onBack={() => selectPage('Technologies')} />
    }

    if (page === 'Skills') {
      return <Skills onCreate={() => { setSelectedSkill(null); openEditor('SkillEditor') }} onEdit={skill => { setSelectedSkill(skill); openEditor('SkillEditorEdit') }} />
    }

    if (page === 'SkillEditor' || page === 'SkillEditorEdit') {
      return <SkillEditor editing={page === 'SkillEditorEdit'} skill={selectedSkill} onBack={() => selectPage('Skills')} />
    }

    if (page === 'Settings') {
      return <Settings theme={theme} darkMode={darkMode} onThemeChange={applyTheme} onDarkModeChange={applyDarkMode} />
    }

    return null
  }

  return (
    <div
      className={`app ${darkMode ? 'dark-mode' : ''}`}
      style={{
        '--accent': themeConfig.accent,
        '--accent-strong': themeConfig.strong,
        '--accent-soft': themeConfig.soft,
        '--theme-bg': themeConfig.bg,
        '--theme-surface': themeConfig.surface,
        '--theme-card': themeConfig.card,
        '--theme-border': themeConfig.border,
        '--theme-glow': themeConfig.glow,
      }}
    >
      <Sidebar active={sidebarPage} setActive={selectPage} open={open} setOpen={setOpen} />

      <div className="mobile-main">
        <Topbar setOpen={setOpen} />
      </div>

      <main className="main">
        <Topbar setOpen={() => {}} />
        {renderPage()}
      </main>
    </div>
  )
}

export default App
