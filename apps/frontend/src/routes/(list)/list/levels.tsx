import { createMemo, createSignal, ErrorBoundary, For, Show, Suspense } from "solid-js"
import { createAsync, query } from "@solidjs/router"
import { getRequestEvent, RequestEvent } from "solid-js/web"

import Level from "~/components/Level"
import LevelInfo from "~/components/LevelInfo"
import ListInfo from "~/components/ListInfo"
import { HiOutlineInformationCircle } from 'solid-icons/hi'
import Spinner from "~/components/Spinner"

import { Levels } from "~/db/schema"
import { client } from "~/trpc/client"
import { auth } from "~/lib/auth"

const getLevels = query(async () => {
	"use server"
	return await client.levels.list.query()
}, "getLevels")

const getSession = query(async (req: RequestEvent | undefined) => {
	"use server"
	try {
		if (!req) {
			return undefined
		}
		const headers = req.request.headers
		return await auth.api.getSession({headers: headers})
	} catch {
		return undefined
	}
}, "getSession")

const List = () => {
	const [search, setSearch] = createSignal("")

	const [level, setLevel] = createSignal<Levels>()

	const levels = createAsync(() => getLevels())

	const session = createAsync(() => getSession(getRequestEvent()))

	const filteredLevels = createMemo(() => {
		if (!search()) return levels()
		return levels()?.filter((level) => level.name.toLowerCase().includes(search()))
	})




	return (
		<div class="flex flex-1 h-[89vh] overflow-hidden">
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
								<h1 class="truncate  justify-center text-xs sm:text-md md:text-xl lg:text-2xl ">Info</h1>
							</div>
							<For each={filteredLevels()}>
								{(level) => <Level level={level} setLevel={setLevel}/>}
							</For>
						</div>
					</Suspense>
				</ErrorBoundary>
			</div>
			<div class="w-7/10 mt-5 border-1 border-base-content overflow-y-scroll">
				<Show when={level()} fallback={<ListInfo />}>
					<Suspense fallback={<Spinner />}>
						<LevelInfo level={level()} session={session()} />
					</Suspense>
				</Show>
			</div>
		</div>
	)
}

export default List
