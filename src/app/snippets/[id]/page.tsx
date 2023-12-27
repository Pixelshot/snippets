import { notFound } from 'next/navigation';
import { db } from '@/db';
import Link from 'next/link';

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

/**
 * Renders the page to show a specific snippet.
 *
 * Fetches the snippet data from the database based on the ID in the page params.
 * Renders the snippet title, code, and provides edit/delete actions.
 * Returns a 404 page if no snippet found for the given ID.
 */
export default async function showSnippetPage(props: SnippetShowPageProps) {
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          {/* <Link> */}
          <button className="p-2 border rounded">Delete</button>
          {/* </Link> */}
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
