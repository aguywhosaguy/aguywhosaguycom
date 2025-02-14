import { renderPlaygroundPage } from '@trpc-playground/html'
import { type APIEvent } from "@solidjs/start/server";
import { getBaseUrl } from "~/trpc/client";
import { appRouter } from "~/trpc/routers/_app";
import "dotenv/config"

export const GET = (event: APIEvent) => {
  if (process.env.NODE_ENV != "development") {
    return new Response("Not found", { status: 404 });
  }

  return new Response(
    renderPlaygroundPage({
		clientConfig: {
			trpcApiEndpoint: `${getBaseUrl()}/api/trpc`,
			playgroundEndpoint: `${getBaseUrl()}/api/dev/trpc`,
			polling: { enable: false, interval: 4000 },
			request: { globalHeaders: {}, superjson: false },
		},
		cdnUrl: "//cdn.jsdelivr.net/npm",
		version: "latest"
	}), {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
};

