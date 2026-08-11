# Vercel Analytics and Speed Insights Design

## Goal

Enable privacy-friendly visitor analytics and real-user performance monitoring across every route of the Emerge Dental Studio website.

## Approach

Use Vercel's official Next.js packages:

- `@vercel/analytics` for page views and visitor analytics.
- `@vercel/speed-insights` for Core Web Vitals and performance measurements.

Render both framework components once in `app/layout.tsx`, inside the root `<body>`, so the integration covers all App Router pages without duplicating tracking code.

## Scope

The implementation will:

1. Add both official packages as production dependencies.
2. Add `<Analytics />` and `<SpeedInsights />` to the root layout.
3. Add a regression test that verifies the packages and root-layout components remain present.
4. Run the focused test, lint, and production build.

Custom events, conversion tracking, consent banners, and changes to visible page design are outside this change.

## Runtime Behavior

The components inject Vercel's tracking scripts when the deployed site runs. They do not change the visible interface. Vercel receives page-view data from Web Analytics and field performance measurements from Speed Insights. Local development does not need analytics data to be collected for verification.

## Deployment

After the code is deployed to Vercel, Web Analytics and Speed Insights must each be enabled for the project in the Vercel dashboard if they are not already active. Data appears after the deployment receives visits.

## Failure Handling

Analytics is non-critical observability. Failure to load either tracking script must not prevent the website from rendering or visitors from using booking and contact paths.

## Verification

- A focused automated regression test will fail before the integration exists and pass afterward.
- ESLint will validate the changed source and test files.
- A production build will verify that the packages and Next.js-specific imports compile successfully.
- After deployment, the Vercel dashboards can be checked for incoming page-view and performance data.
