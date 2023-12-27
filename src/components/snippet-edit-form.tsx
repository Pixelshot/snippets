'use client';
// Prisma has it's owned defined interface/types to help us with our data.
import type { Snippet } from '@prisma/client';
import { useState } from 'react';
import { editSnippet } from '@/actions';
import Editor from '@monaco-editor/react';

interface SnippetEditFormProps {
  snippet: Snippet;
}
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };
  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        className="pt-2"
        onChange={handleEditorChange}
      />
    </div>
  );
}
