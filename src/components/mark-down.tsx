import ReactMarkdown from 'react-markdown'
import rehypeColorChips from 'rehype-color-chips'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function MarkdownRenderer({ markdown }: any) {
	return (
		<ReactMarkdown
			children={markdown}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeColorChips]}
			components={{
				code(props) {
					const { children, className, node, ...rest } = props
					const match = /language-(\w+)/.exec(className || '')

					return match ? (
						<SyntaxHighlighter
							{...rest}
							PreTag='div'
							showLineNumbers
							children={children}
							language={match[1]}
							style={dracula}
						/>
					) : (
						<code {...rest} className={className}>
							{children}
						</code>
					)
				},
			}}
		/>
	)
}
