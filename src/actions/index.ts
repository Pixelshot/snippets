// This is where all the server functions that's needed on the Client-side are defined.
// It's much easier to put everything into one file and call the ones that are needed from here.
'use server';

import { db } from "@/db";
import { redirect } from 'next/navigation';

// To be used inside of snippet-edit-form.tsx
export async function editSnippet(id: number, code: string) {
	await db.snippet.update({ where: { id }, data: { code } });

	redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
	await db.snippet.delete({ where: { id } });
	redirect('/');
}