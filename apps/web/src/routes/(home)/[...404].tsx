import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <main>
      <Title>whoops</Title>
      <HttpStatusCode code={404} />
      <h1 class="text-4xl pb-5">404</h1>
      <p>
        you're <A class="underline text-primary" href="/">lost</A>
      </p>
    </main>
  );
}
