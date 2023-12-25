import { redirect } from 'next/navigation';
import { db } from '@/db'; // the only file in db(index.ts) will automatically be loaded

export default function SnippetCreatePage() {
  // This async function is to deal with the input submitted from the user on our form
  // It's async because it'll be dealing with the database, therefore it may take a bit of time to respond
  // Remember: All of the information the user has given is stored in formData, just like in Remix.run
  // This function is being called below in <form action={createSnippet}>
  async function createSnippet(formData: FormData) {
    // This needs to be a server action
    // Whenever Next.js sees 'use server' at the top of a function, it'll treat that function as a server side function
    'use server';

    // Check the user's inputs and make sure they're valid
    // .get('title') and .get('name) is based on the 'name' property inside of HTML form element below
    // Temporarily we're just going to tell TS that these variables are indeed strings: See #22
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    // Create a new record in the database
    const snippet = await db.snippet.create({
      data: {
        // Because key and values are the same, we can short cut with just the key
        title,
        code,
      },
    });

    console.log(snippet);
    // Redirect the user back to the root route(see if we can show a flash message indicating the snippet was successfully created)
    // User Next's redirect
    redirect('/');
  }
  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
