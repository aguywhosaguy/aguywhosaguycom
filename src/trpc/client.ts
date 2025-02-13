import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "./routers/_app";

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VITE_VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VITE_VERCEL_PROJECT_PRODUCTION_URL}`; // custom domain
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      fetch: (url, options) => {
        console.log('Making request to:', url);
        console.log('With options:', options);
        return fetch(url, options);
      }
    }),
  ],
});