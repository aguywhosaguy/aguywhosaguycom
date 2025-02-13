import { createResource, createSignal, For, Suspense } from "solid-js"
import Level from "~/components/Level"
import { client } from "~/trpc/client"

const List = () => {
	const [levels] = createResource(async () => {
		return await client.levels.list.query()
	})

	const [title, setTitle] = createSignal("UDUFOPCL")

	return (
		<div class="mx-auto my-5 w-4/5 space-y-5">
			<Title>UDOFOPCL</Title>
			<h1 class="text-white font-bold text-6xl my-10" on:mouseover={() => setTitle("Upside-Down UFO Platformer Challenge List")} on:mouseleave={() => setTitle("UDUFOPCL")}>
				{title()}
			</h1>
			<Suspense fallback={<div>Loading..</div>}>
				<For each={levels()}>
					{(level) => <Level level={level} />}
				</For>
			</Suspense>
		</div>
	)
}

export default List
