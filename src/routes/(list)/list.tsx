import { RouteSectionProps } from "@solidjs/router"
import './List.css'


const ListLayout = (props: RouteSectionProps) => {
	return (
	<div>
		<div class="mt-5 mx-5">
			<span class="font-bold text-md text-white">UDUFOPCL</span>
		</div>
		<div>
			{props.children}
		</div>
	</div>
	)
}

export default ListLayout