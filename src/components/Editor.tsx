import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type OnContentChangeData = {
  title: string
  content: string
}

interface EditorProps {
  content: string
  onContentChange: (data: OnContentChangeData) => void
}

export function Editor({ content, onContentChange }: EditorProps) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none prose-headings:mt-0 flex-1',
      },
    },
    extensions: [
      Document.extend({
        content: 'heading block*',
      }),
      StarterKit.configure({
        codeBlock: false,
        document: false,
      }),
      Placeholder.configure({
        placeholder: 'Untitled',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-zinc-300 before:h-0 before:float-left before:pointer-events-none',
      }),
    ],
    onUpdate: ({ editor }) => {
      const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/
      const parsedContent = editor.getHTML().match(contentRegex)?.groups

      const title = parsedContent?.title ?? 'Untitled'
      const content = parsedContent?.content ?? ''

      onContentChange({ title, content })
    },
    content,
    autofocus: 'end',
  })

  return <EditorContent editor={editor} className="flex-1 w-[65ch] flex" />
}
