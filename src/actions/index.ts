// This is where all the server functions that's needed on the Client-side are defined.
// It's much easier to put everything into one file and call the ones that are needed from here.
// Whenever Next.js sees 'use server' at the top of a function, it'll treat that function as a server side function
'use server';

import { db } from "@/db"; // Since index.ts is the only file in db, it will automatically be loaded
import { redirect } from 'next/navigation';

// This async function is to deal with the input submitted from the user on our form
// It's async because it'll be dealing with the database, therefore it may take a bit of time to respond
// Remember: All of the information the user has given is stored in formData, just like in Remix.run
// This function is being called below in app>snippets>new>page.tsx
// fomrstate is the object that we're passing on from the server to client side in new>page.tsx. See #42
export async function createSnippet(formState: { message: string }, formData: FormData) {
	// Check the user's inputs and make sure they're valid
	// .get('title') and .get('name) is based on the 'name' property inside of HTML form element below
	const title = formData.get('title');
	const code = formData.get('code');

	if (typeof title !== 'string' || title.length < 3) {
		return {
			message: "Title must be longer than 3 characters",
		}
	}

	if (typeof code !== 'string' || code.length < 10) {
		return {
			message: 'Code must be longer than 10 characters',
		}
	}

	// Create a new record in the database
	const snippet = await db.snippet.create({
		data: {
			// Because key and values are the same, we can short cut with just the key
			title,
			code,
		},
	});

	// TODO: Redirect the user back to the root route(see if we can show a flash message indicating the snippet was successfully created)
	// User Next's redirect
	redirect('/');
}


// To be used inside of snippet-edit-form.tsx
export async function editSnippet(id: number, code: string) {
	await db.snippet.update({ where: { id }, data: { code } });

	redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
	await db.snippet.delete({ where: { id } });
	redirect('/');
}