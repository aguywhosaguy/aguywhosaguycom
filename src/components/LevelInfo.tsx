import { Component } from "solid-js"
import { Levels } from "~/db/schema"

interface LevelInfoProps {
	level: Levels | undefined
}


const LevelInfo: Component<LevelInfoProps> = (props) => {
	
	return (
		<div>
			{props.level?.name}
		</div>
	)
}

export default LevelInfo