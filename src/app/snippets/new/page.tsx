'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';

export default function SnippetCreatePage() {
  // fomrState is the object that'll be bouncing off between client side and server side
  // We use this object to send and receive data to/from client to server and vice versa
  // action will update actions.createSnippet. This action is attached to form action
  // message with empty string argument is the initial state. Since it's a server action, it will not reach the server during first rendering. This will only trigger one a submission has been done. The empty string acts as a placeholder for when the server does respond
  const [formState, action] = useFormState(actions.createSnippet, {
    message: '',
  });
  return (
    <form action={action}>
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

        {formState.message ? (
          <div className="my-2 p-2 bg-red-300 border rounded border-red-500">
            {formState.message}
          </div>
        ) : null}
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
