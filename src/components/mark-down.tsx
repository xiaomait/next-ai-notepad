import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import MarkdownCopy from './mark-down-copy'

export default function MarkdownRenderer({ markdown }: any) {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm, remarkSqueezeParagraphs]}
			rehypePlugins={[]}
			components={{
				code(props) {
					const { children, className, node, ...rest } = props
					const id = Math.random().toString(36).substr(2, 9)
					const match = /language-(\w+)/.exec(className || '')
					return match ? (
						<div className='w-80 sm:w-auto'>
							<MarkdownCopy language={match[1]} id={id} />
							<SyntaxHighlighter
								id={id}
								customStyle={{
									maxWidth: '100%',
									marginTop: '0',
									borderRadius: '0',
								}}
								language={match[1]}
								style={dracula}
							>
								{String(children).replace(/\n$/, '')}
							</SyntaxHighlighter>
						</div>
					) : (
						<code {...rest} className={className}>
							{children}
						</code>
					)
				},
			}}
		>
			{markdown}
		</ReactMarkdown>
	)
}
