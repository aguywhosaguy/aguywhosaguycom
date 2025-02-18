import { RouteSectionProps } from "@solidjs/router"
import { createSignal, onMount } from "solid-js"
import { Link, MetaProvider, Title } from "@solidjs/meta"
import { themeChange } from 'theme-change'


const ListLayout = (props: RouteSectionProps) => {
	const [title, setTitle] = createSignal("UDUFOPCL")

	onMount(async () => {
		console.log("MOUNTED")
		themeChange(false)
	})

	return (
	<div class="flex flex-col h-screen">
		<MetaProvider>
			<Title>{title()}</Title>
			<Link rel="icon" href="/jimbo.png" />
		</MetaProvider>

		<div class="flex flex-col">
			<div class="my-[0.25vh] mx-5 flex justify-between items-center h-[9vh]">
				<a 
					href="/list" 
					class="!no-underline font-bold lg:text-4xl md:text-2xl text-xl text-base-content" 
					on:mouseenter={() => setTitle("Upside-Down UFO Platformer Challenge List")} 
					on:mouseleave={() => setTitle("UDUFOPCL")}
				>
					{title()}
				</a>
				<select data-choose-theme class="select cursor-pointer h-3/5 w-1/10 relative top-0 right-0">
					<option class="cursor-pointer rounded-none !hover:bg-white" value="">Night [Default]</option>
					<option class="cursor-pointer rounded-none" value="nord">Nord</option>
					<option class="cursor-pointer rounded-none" value="coffee">Coffee</option>
				</select>
			</div>
			<hr class="border-base-content border-[0.5vh]" />
			<div class="flex-1">
				{props.children}
			</div>

		</div>
	</div>
	)
}

export default ListLayout