import { action, redirect, useSubmission } from "@solidjs/router"
import { Show } from "solid-js"
import { auth } from "~/lib/auth"
import { APIError } from "better-call"
import { betterAuth, BetterAuthError, setCookie } from "better-auth"

const logIn = action(async (formdata: FormData) => {
	"use server"
	const email = formdata.get('email') as string
	const password = formdata.get('password') as string

	try {
		const response = await auth.api.signInEmail({
			body: {
				email: email,
				password: password,
				callbackURL: 'https://aguywhosaguy.com/list'
			},
			asResponse: true
		
		})

		if (response.ok) {
			const headers = response.headers
			return redirect("/list", {headers: headers})
		}
		
		return {
			"error": "Unknown Error"
		}
		
	} catch (e: unknown) {
		const error = e as { cause?: { message?: string } }
		const message = error.cause && error.cause.message ? error.cause.message : 'Critical Error'

		return {
			"error": message
		}
	}

	


}, "logIn")

const LogIn = () => {
	const resource = useSubmission(logIn)

	return (
		<form action={logIn} method="post">
			<fieldset class="fieldset bg-base-200 border border-base-300 p-3 rounded-box">
				<legend class="fieldset-legend">Log In</legend>
				
				<label class="fieldset-label">Email</label>
				<input required name="email" type="email" class="input validator w-full" placeholder="robtop@robtop.com" />

				<label class="fieldset-label">Password</label>
				<input required name="password" type="password" class="input validator w-full mb-4" placeholder="password.." minlength={8} />

				<button class="btn btn-info" disabled={resource.pending}>Log In</button>
				<Show when={resource.result?.error}>
					<div class={"fieldset-label mt-1 text-error"}>{resource.result?.error}</div>
				</Show>
			</fieldset>
		</form>
	)
}

export default LogIn