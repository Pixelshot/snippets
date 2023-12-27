'use client';
// Prisma has it's owned defined interface/types to help us with our data.
import type { Snippet } from '@prisma/client';

interface SnippetEditFormProps {
  snippet: Snippet;
}
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  return <div>Client component has a snippet with title {snippet.title}</div>;
}
