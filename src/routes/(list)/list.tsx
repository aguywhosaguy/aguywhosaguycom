import { RouteSectionProps } from "@solidjs/router"
import { createSignal } from "solid-js"
import { Title } from "@solidjs/meta"


const ListLayout = (props: RouteSectionProps) => {
	const [title, setTitle] = createSignal("UDUFOPCL")


	return (
	<div>
		<Title>{title()}</Title>
		<div class="my-5 mx-5">
			<a href="/list" class="!no-underline font-bold lg:text-4xl md:text-2xl text-xl text-base-content" on:mouseenter={() => setTitle("Upside-Down UFO Platformer Challenge List")} on:mouseleave={() => setTitle("UDUFOPCL")}>{title()}</a>
		</div>
		<hr class="border-base-content border-3" />
		<div>
			
			{props.children}
		</div>
	</div>
	)
}

export default ListLayout