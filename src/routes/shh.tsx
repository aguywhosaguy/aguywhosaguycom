import { Title } from "@solidjs/meta";

export default function Secret() {
  return (
    <div class="flex flex-col justify-center bg-repeat bg-size[64px_64px] bg-[url('/rusty3.jpg')] w-full h-screen animate-scroll">
      <Title>???</Title>
      <a class="mx-auto text-primary text-3xl" href="/projects">return</a>
    </div>
  )
}
