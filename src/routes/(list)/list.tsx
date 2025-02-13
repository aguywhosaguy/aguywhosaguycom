import { RouteSectionProps } from "@solidjs/router"
import './List.css'


const ListLayout = (props: RouteSectionProps) => {
	return (
	<div>
		{props.children}
	</div>
	)
}

export default ListLayout