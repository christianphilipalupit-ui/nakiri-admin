import whisperCover from '../assets/demo-projects/whisper-cover.svg'
import whisperDetail from '../assets/demo-projects/whisper-detail.svg'
import whisperCode from '../assets/demo-projects/whisper-code.svg'

const whisperImages = [
  { id: 'demo-whisper-image-1', image_path: 'demo/whisper-cover.svg', alt_text: 'Whisper Speech-to-Text waveform', sort_order: 1, is_cover: true, publicUrl: whisperCover },
  { id: 'demo-whisper-image-2', image_path: 'demo/whisper-detail.svg', alt_text: 'Whisper Speech-to-Text transcription interface', sort_order: 2, is_cover: false, publicUrl: whisperDetail },
  { id: 'demo-whisper-image-3', image_path: 'demo/whisper-code.svg', alt_text: 'Whisper Speech-to-Text code preview', sort_order: 3, is_cover: false, publicUrl: whisperCode },
]

const demoProjects = [
  {
    id: 'demo-project-whisper', name: 'Whisper Speech-to-Text', slug: 'whisper-speech-to-text',
    short: 'A fast, focused interface for turning spoken ideas into accurate text.',
    full: 'A speech-to-text experience designed around clear transcription, quick review, and a calm writing workflow.',
    techs: ['React', 'TypeScript', 'OpenAI'], status: 'Published', visibility: 'Public', showOnPortfolio: true, featured: true,
    liveDemoUrl: 'https://example.com/whisper-speech-to-text', githubUrl: 'https://github.com/example/whisper-speech-to-text',
    coverImage: whisperImages[0], images: whisperImages,
  },
  {
    id: 'demo-project-forest-notes', name: 'Forest Notes', slug: 'forest-notes',
    short: 'A lightweight notes workspace for ideas, references, and field observations.',
    full: 'A quiet notes workspace that keeps research fragments organized without getting in the way of thinking.',
    techs: ['React', 'Supabase', 'SCSS'], status: 'Published', visibility: 'Public', showOnPortfolio: true, featured: false,
    liveDemoUrl: 'https://example.com/forest-notes', githubUrl: 'https://github.com/example/forest-notes', coverImage: null, images: [],
  },
  {
    id: 'demo-project-signal-board', name: 'Signal Board', slug: 'signal-board',
    short: 'A visual dashboard for collecting and prioritizing product signals.',
    full: 'A compact dashboard concept for turning scattered feedback into a shared view of what matters next.',
    techs: ['Next.js', 'Node.js', 'PostgreSQL'], status: 'Draft', visibility: 'Public', showOnPortfolio: true, featured: false,
    liveDemoUrl: '', githubUrl: '', coverImage: null, images: [],
  },
]

export default demoProjects
