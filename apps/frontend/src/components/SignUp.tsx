import { action, redirect, useSubmission } from "@solidjs/router"
import { Show } from "solid-js"
import { auth } from "~/lib/auth"

const signUp = action(async (formdata: FormData) => {
	"use server"
	//const formdata = new FormData(event.target as HTMLFormElement)

	const name = formdata.get('name') as string
	const email = formdata.get('email') as string
	const password = formdata.get('password') as string
	try {
		const resp = await auth.api.signUpEmail({
			body: {
				name: name,
				email: email,
				password: password
			},
			asResponse: true
		})

		return redirect("/list", {headers: resp.headers})


	} catch (e: unknown) {
		const error = e as { cause?: { message?: string } }
		const message = error.cause && error.cause.message ? error.cause.message : 'Critical Error'

		return {
			'error': message
		}
	}



}, "signUp")

const SignUp = () => {
	const resource = useSubmission(signUp)

	return (
		<form action={signUp} method="post">
			<fieldset class="fieldset bg-base-200 border border-base-300 p-3 rounded-box">
				<legend class="fieldset-legend">Sign Up</legend>
				
				<label class="fieldset-label">Name</label>
				<input required name="name" type="text" class="input w-full" placeholder="name.." />

				<label class="fieldset-label">Email</label>
				<input required name="email" type="email" class="input validator w-full" placeholder="robtop@robtop.com" />
				<div class="fieldset-label mt-1 mb-3">Email must be unique</div>

				<label class="fieldset-label">Password</label>
				<input required name="password" type="password" class="input validator w-full" placeholder="password.." minlength={8} />
				<div class="fieldset-label mt-1 mb-3">Password must have a minimum of 8 characters</div>

				<button class="btn btn-info" disabled={resource.pending}>Sign Up</button>
				<Show when={resource.result?.error}>
					<div class={"fieldset-label mt-1 text-error"}>
						{resource.result?.error}
					</div>
				</Show>
			</fieldset>
		</form>
	)
}

export default SignUp