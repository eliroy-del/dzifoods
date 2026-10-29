"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="text-muted-foreground mt-3 max-w-md text-sm">{error.message}</p>
      <button type="button" onClick={reset} className="text-accent mt-6 text-sm">
        Try again
      </button>
    </main>
  );
}
