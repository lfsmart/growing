import { useFetcher, Link, useHref } from 'react-router-dom';

interface TodoItemProps {
  id: string;
  todo: string;
}

export default function UseFetcher({ id, todo }: TodoItemProps) {
  let fetcher = useFetcher();
  let isDeleting = fetcher.formData != null;
  return (
    <>
      &nbsp;
      <fetcher.Form method="post" style={{ display: "inline" }}>
        <input type="hidden" name="action" value="delete" />
        <button type="submit" name="todoId" value={id} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </fetcher.Form>
    </>
  );
}