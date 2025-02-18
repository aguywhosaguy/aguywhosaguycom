// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { onMount } from "solid-js";
import { themeChange } from "theme-change";

export default createHandler(() => {
  onMount(async () => {
		themeChange()
	})

  return (
      <StartServer
      document={({ assets, children, scripts }) => (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  )
})
