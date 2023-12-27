import Link from 'next/link';
import { db } from '@/db';

/**
 * Home page component.
 *
 * Fetches all snippets from the database and displays them in a list.
 * Allows creating a new snippet.
 */
export default async function Home() {
  const snippets = await db.snippet.findMany();
  // loop through snippet and display title in h1 tag
  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });
  console.log(snippets);

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
