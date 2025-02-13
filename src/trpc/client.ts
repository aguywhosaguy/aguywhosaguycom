import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "./routers/_app";

export const client = createTRPCClient<AppRouter>({
  links: [loggerLink(), httpBatchLink({ url: "http://localhost:3000/api/trpc" })]
});