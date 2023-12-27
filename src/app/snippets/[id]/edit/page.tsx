/**
 * Props for the SnippetEditPage component.
 *
 * Contains the route params with the id of the snippet to edit.
 */
interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default function SnippetEditPage(props: SnippetEditPageProps) {
  const id = parseInt(props.params.id);

  return <div>Editing snippet with id {id}</div>;
}
