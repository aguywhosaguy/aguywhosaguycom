import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "./routers/_app";

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

console.debug(getBaseUrl())

export const client = createTRPCClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});