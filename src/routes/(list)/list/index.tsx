import { createAsync, query } from "@solidjs/router"
import { For, Suspense } from "solid-js"
import Level from "~/components/Level"
import { client } from "~/trpc/client"

const getLevels = query(async () => {
	const levels = await client.levels.list.query()

	return levels
}, "getlevels")


const List = () => {
	const levels = createAsync(() => getLevels())

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