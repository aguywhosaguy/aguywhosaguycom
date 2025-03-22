import { RouteSectionProps } from "@solidjs/router"
import { createSignal, Suspense } from "solid-js"
import { Link, MetaProvider, Title } from "@solidjs/meta"
import Spinner from "~/components/Spinner"


const ListLayout = (props: RouteSectionProps) => {
	const [title, setTitle] = createSignal("UDUFOPCL")

	return (
	<div class="flex flex-col h-screen">
		<MetaProvider>
			<Title>{title()}</Title>
			<Link rel="icon" href="/jimbo.png" />
		</MetaProvider>

		<div class="flex flex-col">
			<div class="my-[0.25vh] mx-5 flex justify-between items-center h-[9vh]">
				<a 
					href="/list/levels" 
					class="!no-underline font-bold lg:text-4xl md:text-2xl text-xl text-base-content" 
					on:mouseenter={() => setTitle("Upside-Down UFO Platformer Challenge List")} 
					on:mouseleave={() => setTitle("UDUFOPCL")}
				>
					{title()}
				</a>
				<div class="dropdown">
					<div tabIndex={0} role="button" class="btn btn-sm m-1">
						Theme
					</div>
					<ul tabIndex={0} class="dropdown-content bg-base-300 rounded-box z-1">
						<li>
							<input 
								type="radio"
								name="theme-dropdown"
								class="theme-controller btn btn-sm btn-block justify-center"	
								aria-label="Sunset"
								value="sunset"
							/>
						</li>
						<li>
							<input 
								type="radio"
								name="theme-dropdown"
								class="theme-controller btn btn-sm btn-block justify-center"	
								aria-label="silk"
								value="silk"
							/>
						</li>
						<li>
							<input 
								type="radio"
								name="theme-dropdown"
								class="theme-controller btn btn-sm btn-block justify-center"	
								aria-label="Coffee"
								value="coffee"
							/>
						</li>
					</ul>
				</div>
			</div>
			<hr class="border-base-content border-[0.5vh]" />
			<div class="flex-1">
				<Suspense fallback={<Spinner />}>
					{props.children}
				</Suspense>
			</div>

		</div>
	</div>
	)
}

export default ListLayout