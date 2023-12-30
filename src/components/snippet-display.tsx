'use client';

import type { Snippet } from '@prisma/client';
import { useState } from 'react';
import * as actions from '@/actions';
import Editor from '@monaco-editor/react';

interface SnippetDisplayProps {
  snippet: Snippet;
}

export default function SnippetDisplay({ snippet }: SnippetDisplayProps) {
  const [code, setCode] = useState(snippet.code);

  const options = {
    minimap: { enabled: false },
    readOnly: true,
  };

  return (
    <pre>
      <Editor
        height="30vh"
        theme="vs-dark"
        language="html"
        defaultValue={code}
        options={options}
        className="pt-2"
      />
    </pre>
  );
}
