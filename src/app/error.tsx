"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page max-w-2xl py-24 text-center" role="alert">
      <p className="font-brush text-3xl text-teal">Oops — a smudge on the canvas</p>
      <h1 className="mt-2 text-4xl font-medium">Something went wrong</h1>
      <p className="mt-4 text-lg text-stone">Sorry about that. Please try again, or head back to the homepage.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="outline">Back to home</ButtonLink>
      </div>
    </section>
  );
}
