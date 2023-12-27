// This is where all the server functions that's needed on the Client-side are defined.
// It's much easier to put everything into one file and call the ones that are needed from here.
'use server';

import { db } from "@/db";

// To be used inside of snippet-edit-form.tsx
export async function editSnippet() {
	console.log('edit snippet called')
}