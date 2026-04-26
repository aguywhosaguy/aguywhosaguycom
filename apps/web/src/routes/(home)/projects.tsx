import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For, Show } from "solid-js";

type ProjectInfo = {
  img: string;
  name: string;
  date: Date;
  desc: string;
  repo: string;
}

const projects: ProjectInfo[] = [
  {
    img: "/etc/rusty3.jpg",
    name: "aguywhosaguy.com",
    date: new Date("4/24/26"),
    desc: "The third iteration of the website you're using right now. Powered by SolidStart!",
    repo: "https://github.com/aguywhosaguy/aguywhosaguycom"
  },
  {
    img: "/thumbnails/tde.png",
    name: "Thirty Dollar Extension",
    date: new Date("8/14/24"),
    desc: "A web extension for adding custom sounds to GDColon's thirtydollar.website.",
    repo: "https://github.com/aguywhosaguy/thirtyDollarExtension"
  }
]

function Project(proj: ProjectInfo) {
  const month = new Intl.DateTimeFormat("en-US", {month: "long"}).format(proj.date)


  return (
    <div class="flex h-48 mb-5 border border-base-300">
      <div class="hidden md:flex w-1/2">
        <Show when={proj.name == "aguywhosaguy.com"} fallback={<img class="m-auto aspect-video w-3/4" src={proj.img} />}>
          <div class="inline-flex md:text-xl items-center justify-center aspect-video m-auto w-3/4 bg-base-300">
            You are here<A class="text-primary" href="/shh">.</A>
          </div>
        </Show>
      </div>
      <div class="flex flex-col m-auto aspect-video h-9/12 w-11/12 md:w-1/2 pr-2">
        <a class="text-primary text-lg font-semibold" href={proj.repo}>{proj.name}</a>
        <sub class="text-sm italic pb-2">{month} {proj.date.getFullYear()}</sub> 
        <p class="mt-auto self-end">{proj.desc}</p>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <div>
      <Title>projects</Title>
      <For each={projects.sort((a: ProjectInfo, b: ProjectInfo) => {return b.date.getTime() - a.date.getTime()})}>
        {
          (project: ProjectInfo) => 
            <Project img={project.img} name={project.name} date={project.date} desc={project.desc} repo={project.repo}  />
        }
      </For>
    </div>
  )
}
