import decisionsContent from '../content/decisions.md?raw'
import { MarkdownPage } from './MarkdownPage'

export function Decisions() {
  return <MarkdownPage content={decisionsContent} />
}
