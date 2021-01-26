// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
    // Sentry.init({
    //     dsn:
    //         "https://cc82bee6052547a89a526925a7e69a94@o501220.ingest.sentry.io/5582105",
    //     release: " 1-0-0",

    //     autoSessionTracking: true,
    //     integrations: [new Integrations.BrowserTracing()],

    //     // We recommend adjusting this value in production, or using tracesSampler
    //     // for finer control
    //     tracesSampleRate: 1.0,
    // });
}

function log(error) {
    // Sentry.captureException(error);
    // Sentry.captureMessage("An unexpected error has occurred w/axios");
    console.error(error);
}

export default {
    init,
    log,
};
