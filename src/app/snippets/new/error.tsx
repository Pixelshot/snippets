'use client';

interface ErrorPageProps {
  error: Error;
  reset: () => void; // enables us to automatically refresh a route. Usually wrapped in a button
  statusCode?: number;
}

export default function ErrorPage({
  error,
  reset,
  statusCode,
}: ErrorPageProps) {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <pre>{error.message}</pre>
    </div>
  );
}
