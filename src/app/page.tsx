import { db } from '@/db';
export default async function Home() {
  const snippets = await db.snippet.findMany();
  // loop through snippet and display title in h1 tag
  const renderedSnippets = snippets.map((snippet) => {
    return <div key={snippet.id}>{snippet.title}</div>;
  });
  console.log(snippets);

  return <div>{renderedSnippets}</div>;
}
