import { isSupabaseConfigured, supabase } from '../lib/supabase.js'

const storageBucket = 'project-images'

const mapTechnologies = technologies => {
  if (Array.isArray(technologies)) return technologies
  if (typeof technologies === 'string') return technologies.split(',').map(item => item.trim()).filter(Boolean)
  return []
}

export async function fetchPortfolioProjects() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('id, title, slug, short_description, description, technologies, live_url, github_url, featured, sort_order, created_at')
    .order('sort_order', { ascending: true })

  if (projectsError) throw projectsError

  const projectIds = (projects || []).map(project => project.id)
  let images = []

  if (projectIds.length) {
    const { data: projectImages, error: imagesError } = await supabase
      .from('project_images')
      .select('id, project_id, image_path, alt_text, sort_order, is_cover, created_at')
      .in('project_id', projectIds)
      .order('sort_order', { ascending: true })

    if (imagesError) throw imagesError
    images = projectImages || []
  }

  const imagesByProject = images.reduce((grouped, image) => {
    const projectImages = grouped[image.project_id] || []
    const { data } = supabase.storage.from(storageBucket).getPublicUrl(image.image_path)
    projectImages.push({ ...image, publicUrl: data.publicUrl })
    grouped[image.project_id] = projectImages
    return grouped
  }, {})

  return (projects || []).map(project => {
    const projectImages = [...(imagesByProject[project.id] || [])].sort((first, second) => {
      const firstOrder = first.sort_order ?? Number.MAX_SAFE_INTEGER
      const secondOrder = second.sort_order ?? Number.MAX_SAFE_INTEGER
      return firstOrder - secondOrder
    })
    const coverImage = projectImages.find(image => image.is_cover) || projectImages[0] || null

    return {
      id: project.id,
      name: project.title,
      slug: project.slug,
      short: project.short_description,
      full: project.description,
      techs: mapTechnologies(project.technologies),
      liveDemoUrl: project.live_url,
      githubUrl: project.github_url,
      featured: project.featured,
      order: project.sort_order,
      createdAt: project.created_at,
      images: projectImages,
      coverImage,
    }
  })
}
