import { Component, Show } from "solid-js"
import { Levels } from "~/db/schema"
import { Session } from "~/lib/auth-client"

interface LevelInfoProps {
	level: Levels | undefined
	session: Session | null | undefined
}

interface PlaceholderImageProps {
	message: string
}

const PlaceholderImage: Component<PlaceholderImageProps> = (props) => {
	return (
		<div 
			class="w-3/4 aspect-[16/9] bg-base-300 flex justify-center items-center" 
		>
			{props.message}
		</div>

	)
}

const LevelInfo: Component<LevelInfoProps> = (props) => {
	return (
		<div class="w-8/10 m-5 overflow-y-scroll">
			<h1 class="lg:text-5xl md:text-3xl text-xl">
				#{props.level?.placement} - <strong>{props.level?.name}</strong>
			</h1>
			<h6 class="decoration-dotted underline text-lg cursor-pointer hover:text-accent w-min" onClick={() => navigator.clipboard.writeText(props.level?.id.toString() || '')}>
				{props.level?.id}
			</h6>
			<Show when={props.session}>
					<div class="mt-2 space-x-2">
						<Show when={(props.session?.user.rank ?? 0) >= 1}>
							<button class="btn btn-info">Move</button>
						</Show>
						<Show when={(props.session?.user.rank ?? 0) >= 2}>
							<button class="btn btn-error">Delete</button>
						</Show>
					</div>
			</Show>
			<h2 class="lg:text-xl md:text-lg text-md pt-5">
				<strong>Created by </strong> {props.level?.creator}
			</h2>
			<h2 class="lg:text-xl md:text-lg text-md">
				<strong>Verified by </strong> {props.level?.verifier}
			</h2>
			<div class="mt-5 w-full">
				<Show when={props.level?.url} fallback={<PlaceholderImage message="No Image Available" />}>
					<img 
						src={props.level?.url || undefined} 
						alt="Level Image" 
						class="w-3/4 h-auto"
					/>
				</Show>
			</div>
		</div>
	)
}

//class="mt-5 w-7/10 h-auto"

export default LevelInfo