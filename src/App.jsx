import { useEffect, useState } from 'react'

import './styles.css'

import Sidebar from './components/layout/Sidebar.jsx'
import Topbar from './components/layout/Header.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BlogEditor from './pages/blog/BlogEditor.jsx'
import BlogPosts, { defaultPosts } from './pages/blog/BlogPosts.jsx'
import ProjectEditor from './pages/projects/ProjectEditor.jsx'
import Projects from './pages/projects/Projects.jsx'
import ResearchDashboard from './pages/research/ResearchDashboard.jsx'
import NicheTrendSearch from './pages/research/NicheTrendSearch.jsx'
import ResearchResults from './pages/research/ResearchResults.jsx'
import SavedResearch from './pages/research/SavedResearch.jsx'
import Opportunities from './pages/research/Opportunities.jsx'
import OpportunityDetail from './pages/research/OpportunityDetail.jsx'
import DesignBrief from './pages/research/DesignBrief.jsx'
import MockupStudio from './pages/research/MockupStudio.jsx'
import MockupLibrary from './pages/research/MockupLibrary.jsx'
import DesignDetail from './pages/research/DesignDetail.jsx'
import Settings, { themes } from './pages/settings/Settings.jsx'
import SkillEditor from './pages/skills/SkillEditor.jsx'
import Skills, { defaultSkills } from './pages/skills/Skills.jsx'
import SocialPostEditor from './pages/social/SocialPostEditor.jsx'
import SocialPosts, { defaultPosts as defaultSocialPosts } from './pages/social/SocialPosts.jsx'
import Technologies, { defaultTechnologies } from './pages/technologies/Technologies.jsx'
import TechnologyEditor from './pages/technologies/TechnologyEditor.jsx'
import { fetchPortfolioProjects, isDemoMode } from './data/portfolioProjects.js'

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
  Opportunities: 'Research / Trending',
  OpportunityDetail: 'Research / Trending',
  DesignBrief: 'Research / Trending',
  MockupStudio: 'Research / Trending',
  MockupLibrary: 'Research / Trending',
}

function App() {
  const [active, setActive] = useState('Dashboard')
  const [open, setOpen] = useState(false)
  const [editor, setEditor] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [skills, setSkills] = useState(defaultSkills)
  const [projects, setProjects] = useState([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [projectsError, setProjectsError] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [blogPosts, setBlogPosts] = useState(defaultPosts)
  const [selectedBlogPost, setSelectedBlogPost] = useState(null)
  const [socialPosts, setSocialPosts] = useState(defaultSocialPosts)
  const [selectedSocialPost, setSelectedSocialPost] = useState(null)
  const [technologies, setTechnologies] = useState(defaultTechnologies)
  const [selectedTechnology, setSelectedTechnology] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('nakiri-theme') || 'nakiri')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('nakiri-dark-mode') === 'true')

  useEffect(() => {
    let activeRequest = true

    fetchPortfolioProjects()
      .then(nextProjects => {
        if (!activeRequest) return
        setProjects(nextProjects)
        setProjectsError('')
      })
      .catch(error => {
        if (!activeRequest) return
        setProjectsError(error.message || 'Unable to load Portfolio projects.')
      })
      .finally(() => {
        if (activeRequest) setProjectsLoading(false)
      })

    return () => {
      activeRequest = false
    }
  }, [])

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

  const openNewProject = () => {
    setSelectedProject(null)
    openEditor('ProjectEditor')
  }

  const openProjectEditor = project => {
    setSelectedProject(project)
    openEditor('ProjectEditor')
  }

  const saveProject = project => {
    setProjects(current => project.id
      ? current.map(item => item.id === project.id ? project : item)
      : [...current, { ...project, id: `project-${Date.now()}` }])
    setEditor(null)
    setActive('Projects')
  }

  const openNewBlogPost = () => {
    setSelectedBlogPost(null)
    openEditor('BlogEditor')
  }

  const openBlogPostEditor = post => {
    setSelectedBlogPost(post)
    openEditor('BlogEditor')
  }

  const saveBlogPost = post => {
    setBlogPosts(current => post.id
      ? current.map(item => item.id === post.id ? post : item)
      : [...current, { ...post, id: `post-${Date.now()}` }])
    setEditor(null)
    setActive('Blog Posts')
  }

  const openNewSocialPost = () => {
    setSelectedSocialPost(null)
    openEditor('SocialEditor')
  }

  const openSocialPostEditor = post => {
    setSelectedSocialPost(post)
    openEditor('SocialEditor')
  }

  const saveSocialPost = post => {
    setSocialPosts(current => post.id
      ? current.map(item => item.id === post.id ? post : item)
      : [...current, { ...post, id: 'social-post-' + Date.now() }])
    setEditor(null)
    setActive('Social Posts')
  }

  const openNewTechnology = () => {
    setSelectedTechnology(null)
    openEditor('TechnologyEditor')
  }

  const openTechnologyEditor = technology => {
    setSelectedTechnology(technology)
    openEditor('TechnologyEditorEdit')
  }

  const saveTechnology = technology => {
    setTechnologies(current => technology.id
      ? current.map(item => item.id === technology.id ? technology : item)
      : [...current, { ...technology, id: 'technology-' + Date.now() }])
    setEditor(null)
    setActive('Technologies')
  }

  const saveSkill = skill => {
    setSkills(current => skill.id
      ? current.map(item => item.id === skill.id ? skill : item)
      : [...current, { ...skill, id: 'skill-' + Date.now() }])
    setSelectedSkill(null)
    setEditor(null)
    setActive('Skills')
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
      return <Dashboard onNewProject={openNewProject} onNewPost={openNewBlogPost} onNewSocialPost={openNewSocialPost} />
    }

    if (page === 'Projects') {
      return <Projects projects={projects} loading={projectsLoading} error={projectsError} onNewProject={openNewProject} onEditProject={openProjectEditor} />
    }

    if (page === 'Research / Trending') {
      return <ResearchDashboard onNewResearch={() => openEditor('NicheTrendSearch')} onOpenSavedResearch={() => openEditor('SavedResearch')} onOpenOpportunities={() => openEditor('Opportunities')} />
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

    if (page === 'Opportunities') {
      return <Opportunities onOpenOpportunity={() => openEditor('OpportunityDetail')} />
    }

    if (page === 'OpportunityDetail') {
      return <OpportunityDetail onBack={() => selectPage('Opportunities')} onCreateBrief={() => openEditor('DesignBrief')} />
    }

    if (page === 'DesignBrief') {
      return <DesignBrief onBack={() => openEditor('OpportunityDetail')} onOpportunities={() => selectPage('Opportunities')} onOpenMockup={() => { sessionStorage.removeItem('nakiri-mockup-config'); openEditor('MockupStudio') }} />
    }

    if (page === 'MockupStudio') {
      return <MockupStudio onBack={() => openEditor('DesignBrief')} onOpenLibrary={() => openEditor('MockupLibrary')} />
    }

    if (page === 'MockupLibrary') {
      return <MockupLibrary onBack={() => openEditor('MockupStudio')} onOpenStudio={() => openEditor('MockupStudio')} onNewMockup={() => { sessionStorage.removeItem('nakiri-mockup-config'); openEditor('MockupStudio') }} />
    }

    if (page === 'ProjectEditor') {
      return <ProjectEditor editing={Boolean(selectedProject)} project={selectedProject} onSave={saveProject} onBack={() => selectPage('Projects')} />
    }

    if (page === 'Blog Posts') {
      return <BlogPosts posts={blogPosts} onNewPost={openNewBlogPost} onEditPost={openBlogPostEditor} />
    }

    if (page === 'BlogEditor') {
      return <BlogEditor editing={Boolean(selectedBlogPost)} post={selectedBlogPost} onSave={saveBlogPost} onBack={() => selectPage('Blog Posts')} />
    }

    if (page === 'Social Posts') {
      return <SocialPosts posts={socialPosts} onCreate={openNewSocialPost} onEdit={openSocialPostEditor} />
    }

    if (page === 'SocialEditor') {
      return <SocialPostEditor editing={Boolean(selectedSocialPost)} post={selectedSocialPost} onSave={saveSocialPost} onBack={() => selectPage('Social Posts')} />
    }

    if (page === 'Technologies') {
      return <Technologies technologies={technologies} onCreate={openNewTechnology} onEdit={openTechnologyEditor} />
    }

    if (page === 'TechnologyEditor' || page === 'TechnologyEditorEdit') {
      return <TechnologyEditor editing={page === 'TechnologyEditorEdit'} technology={selectedTechnology} onSave={saveTechnology} onBack={() => selectPage('Technologies')} />
    }

    if (page === 'Skills') {
      return <Skills skills={skills} onCreate={() => { setSelectedSkill(null); openEditor('SkillEditor') }} onEdit={skill => { setSelectedSkill(skill); openEditor('SkillEditorEdit') }} />
    }

    if (page === 'SkillEditor' || page === 'SkillEditorEdit') {
      return <SkillEditor editing={page === 'SkillEditorEdit'} skill={selectedSkill} onSave={saveSkill} onBack={() => { setSelectedSkill(null); selectPage('Skills') }} />
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
        {isDemoMode && <div className="demo-mode-badge">DEMO MODE · Local data only</div>}
        {renderPage()}
      </main>
    </div>
  )
}

export default App
