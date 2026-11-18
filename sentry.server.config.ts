import * as Sentry from "@sentry/nextjs";

const SentryServerConfig = {
  dsn: process.env.SENTRY_DSN || "",
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,
  debug: process.env.NODE_ENV === "development",
  environment: process.env.NODE_ENV,
  release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.RAILWAY_GIT_COMMIT_SHA || undefined,
  integrations: [
    Sentry.postgresIntegration({
      maxQuerySpansToCapture: 10,
    }),
  ],
};

export default SentryServerConfig;
