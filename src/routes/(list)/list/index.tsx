import { createResource, createSignal, ErrorBoundary, For, Show, Suspense } from "solid-js"
import Level from "~/components/Level"
import LevelInfo from "~/components/LevelInfo"
import ListInfo from "~/components/ListInfo"
import { Levels } from "~/db/schema"
import { HiOutlineInformationCircle } from 'solid-icons/hi'
import { client } from "~/trpc/client"
import { createAsync, query } from "@solidjs/router"

const getLevels = query(async () => {
	"use server"
	return await client.levels.list.query()
}, "getLevels")

const List = () => {
	const [search, setSearch] = createSignal("")

	const [level, setLevel] = createSignal<Levels>()

	const levels = createAsync(() => getLevels())

	const filteredLevels = () => {
		if (!search()) return levels()
		return levels()?.filter((level) => level.name.toLowerCase().includes(search()))
	}

	return (
		<div class="flex flex-1 max-h-[90vh] overflow-hidden">
			<div class="mt-5 w-3/10">
				<ErrorBoundary fallback={<div class="text-base-content ml-5">An error occured! Please <a href="/">bully me online</a> until I fix it.</div>}>
					<Suspense fallback={<div class="text-base-content ml-5">Loading..</div>}>
						<div class="overflow-y-scroll h-full">
							<input 
								type="text" 
								placeholder="Search..." 
								value={search()}
								onInput={(e) => setSearch(e.currentTarget.value.toLowerCase())}
								class="w-full h-12 mb-3 px-2 py-1 bg-base-300 text-base-content outline-none"
							/>
							<div 
							class="cursor-pointer m-5 justify-start bg-base-200 hover:bg-base-300 text-base-content h-15 flex items-center text-sm lg:text-2xl md:text-xl p-5 border-1 border-base-content" 
							on:click={() => setLevel(undefined)}
							>
								<HiOutlineInformationCircle class="mr-5 flex-shrink-0" />
								<h1 class="truncate lg:text-2xl lg:inline md:inline md:text-xl sm:hidden">Info</h1>
							</div>
							<For each={filteredLevels()}>
								{(level) => <Level level={level} setLevel={setLevel}/>}
							</For>
						</div>
					</Suspense>
				</ErrorBoundary>
			</div>
			<div class="w-7/10 mt-5 border-1 border-base-content">
				<Show when={level()} fallback={<ListInfo />}>
					<LevelInfo level={level()} />
				</Show>
			</div>
		</div>
	)
}

export default List
