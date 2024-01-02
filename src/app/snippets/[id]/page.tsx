import { notFound } from 'next/navigation';
import { db } from '@/db';
import Link from 'next/link';
import * as actions from '@/actions';
import SnippetDisplay from '@/components/snippet-display';

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

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);
  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link href={`/`} className="p-2 border rounded">
            Home
          </Link>
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      {/* Original design showcasing code */}
      {/* <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre> */}
      <SnippetDisplay snippet={snippet} />
    </div>
  );
}

// This is a dynamic page but we're about to cache it with some pre-loaded data to make it faster to load.
// This can be done by using next's generateStaticParams()
// Note that  you don't have to import this function, it's just a helper function to generate static params for the page.
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(), // The id is stored as a number in the database. Need to convert it to string because this function expects values to be in string format
    };
  });
}
