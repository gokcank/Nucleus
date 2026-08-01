import roadmapContent from '../content/roadmap.md?raw'
import { MarkdownPage } from './MarkdownPage'

export function Roadmap() {
  return <MarkdownPage content={roadmapContent} />
}
