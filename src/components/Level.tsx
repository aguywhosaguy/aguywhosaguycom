import { Component, Setter } from "solid-js";
import { Levels } from "~/db/schema";

interface LevelProps {
	level: Levels,
	setLevel: Setter<Levels | undefined> 
}


const Level: Component<LevelProps> = (props) => {
	return (
		<div 
			class="cursor-pointer bg-base-200 hover:bg-base-300 text-base-content h-15 flex justify-between items-center text-sm lg:text-lg md:text-md p-5 border-1 border-base-content" 
			on:click={() => props.setLevel(props.level)}
		>
			#{props.level.placement} - {props.level.name}
		</div>
	)
}

export default Level