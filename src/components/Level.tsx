import { Component } from "solid-js";
import { Levels } from "~/db/schema";

interface LevelProps {
	level: Levels
}


const Level: Component<LevelProps> = (props) => {
	return (
		<div class="bg-levelbg text-white h-50 flex justify-between items-center rounded-xl">
			<div class="pl-5">
				<h1 class="text-2xl md:text-3xl lg:text-5xl mb-3 font-bold">
					#{props.level.placement} - {props.level.name}
				</h1>
				<h3 class="text-xs md:text-sm lg:text-lg mb-2">
					Creator - {props.level.creator}
				</h3>
				<h3 class="text-xs md:text-sm lg:text-lg">
					Verifier - {props.level.verifier}
				</h3>
			</div>
			<div class="pr-5 text-xl md:text-2xl lg:text-4xl">
				ID: <span 
					class="font-bold underline decoration-dotted cursor-pointer hover:text-neutral-300" 
					onClick={() => navigator.clipboard.writeText(props.level.id.toString())}
				>
					{props.level.id}
				</span>
			</div>
		</div>
	)
}

export default Level