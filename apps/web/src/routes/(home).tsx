import { Title } from "@solidjs/meta";
import { A, RouteSectionProps } from "@solidjs/router";

export default function Home(props: RouteSectionProps) {
  return (
    <div data-theme="abyss" class="min-h-screen bg-base-100">
      <main class="flex flex-col mx-auto my-2 w-4/5 lg:w-5/12">
        <Title>About</Title>
        <p class="pt-5 font-bold font-fira text-3xl">aguywhosaguy</p>
        <nav class="py-3 flex gap-2 border-b border-b-base-300">
          <A href="/" class="font-bold" activeClass="text-primary" end>home</A>
          <A href="/projects" class="font-bold" activeClass="text-primary">projects</A>
        </nav>
        <div class="pt-3">{props.children}</div>
      </main>
    </div>
  );
}
