import demoProjects from './demoProjects.js'

const isDemoMode = import.meta.env.VITE_APP_MODE === 'demo'

export async function fetchPortfolioProjects() {
  if (isDemoMode) return demoProjects

  const { fetchPortfolioProjectsFromSupabase } = await import('./portfolioSupabase.js')
  return fetchPortfolioProjectsFromSupabase()
}

export { isDemoMode }
