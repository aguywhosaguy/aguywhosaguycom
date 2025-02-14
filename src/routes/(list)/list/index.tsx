import { createResource, createSignal, For, Suspense } from "solid-js"
import { Title } from "@solidjs/meta";
import { createResource, createSignal, ErrorBoundary, For, Suspense } from "solid-js"
import Level from "~/components/Level"
import { client } from "~/trpc/client"

const List = () => {
	const [levels] = createResource(async () => {
		return await client.levels.list.query()
	})

	const [title, setTitle] = createSignal("UDUFOPCL")

	return (
		<div class="mx-auto my-5 w-4/5 space-y-5">
			<Title>{title()}</Title>
			<h1 class="text-white font-bold text-6xl my-10" on:mouseover={() => setTitle("Upside-Down UFO Platformer Challenge List")} on:mouseleave={() => setTitle("UDUFOPCL")}>
			<h1 class="text-white font-bold text-3xl md:text-4xl lg:text-6xl my-10" on:mouseover={() => setTitle("Upside-Down UFO Platformer Challenge List")} on:mouseleave={() => setTitle("UDUFOPCL")}>
				{title()}
			</h1>
			<ErrorBoundary fallback={<div class="text-white">An error occured! Please <a href="/">bully me online</a> until I fix it.</div>}>
				<Suspense fallback={<div class="text-white">Loading..</div>}>
					<For each={levels()}>
						{(level) => <Level level={level} />}
					</For>
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}

export default List
