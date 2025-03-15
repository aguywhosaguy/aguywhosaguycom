import { createEffect, createSignal, Show } from "solid-js"
import LogIn from "~/components/LogIn"
import SignUp from "~/components/SignUp"


const Login = () => {
	const [signUp, setPage] = createSignal(true)

	//setPage(false)
	createEffect(() => {
		"use server"
		console.log("Current page:", signUp() ? "Sign Up" : "Log In");
	})

	return (
		<div class="mx-auto w-1/2">
			<div class="join mx-auto mt-[5vh]">
				<input checked={signUp()} type="radio" name="page" class="btn join-item" aria-label="Sign Up" onClick={() => setPage(true)} />
				<input type="radio" name="page" class="btn join-item" aria-label="Log In" onClick={() => setPage(false)} />
			</div>

			<Show when={signUp()} fallback={<LogIn />}>
				<SignUp />
			</Show>
		</div>

	)
}

export default Login