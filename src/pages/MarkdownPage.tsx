import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownPage({ content }: { content: string }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-8">
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  )
}
