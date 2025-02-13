import { createResource, For, Suspense } from "solid-js"
import Level from "~/components/Level"
import { client } from "~/trpc/client"

const List = () => {
	const [levels] = createResource(async () => {
		return await client.levels.list.query()
	})

	return (
		<div class="mx-auto my-5 w-4/5 space-y-5">
			<Suspense fallback={<div>Loading..</div>}>
				<For each={levels()}>
					{(level) => <Level level={level} />}
				</For>
			</Suspense>
		</div>
	)
}

export default List