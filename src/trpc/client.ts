import 'dotenv/config'
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "./routers/_app";

const getRootURL = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api/trpc`;
  return "http://localhost:3000/api/trpc";
}

export const client = createTRPCClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({ 
      url: getRootURL()
    })
  ]
});