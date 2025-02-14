import { Title } from "@solidjs/meta";
import { createResource, createSignal, ErrorBoundary, For, Suspense } from "solid-js"
import Level from "~/components/Level"
import { client } from "~/trpc/client"

const List = () => {
	const [levels] = createResource(async () => {
		return await client.levels.list.query()
	})

	return (
		<div class="mx-auto my-5 w-4/5 space-y-5">
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
