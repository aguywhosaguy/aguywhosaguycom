import { RouteSectionProps } from "@solidjs/router"
import { createSignal } from "solid-js"
import { Title } from "@solidjs/meta"
import './List.css'


const ListLayout = (props: RouteSectionProps) => {
	const [title, setTitle] = createSignal("UDUFOPCL")


	return (
	<div>
		<Title>{title()}</Title>
		<div class="mt-5 mx-5">
			<a href="/list" class="!no-underline font-bold text-md text-white" on:mouseenter={() => setTitle("Upside-Down UFO Platformer Challenge List")} on:mouseleave={() => setTitle("UDUFOPCL")}>{title()}</a>
		</div>
		<div>
			{props.children}
		</div>
	</div>
	)
}

export default ListLayout