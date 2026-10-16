# Kitchan payment flow setup

## Payment administration and automatic UPI switching

Open `/admin/payments` (also linked from `/admin`). This payment panel has its
own server-validated login, separate from the older browser-only storefront admin.
Configure these server-only variables in Vercel Production/Preview and redeploy:

- Connect an Upstash Redis database. Both `UPSTASH_REDIS_REST_URL` +
  `UPSTASH_REDIS_REST_TOKEN` and Vercel Marketplace's `KV_REST_API_URL` +
  `KV_REST_API_TOKEN` names are supported. Do not use the read-only token.
- `PAYMENT_ADMIN_PASSWORD`: at least 12 characters; use a strong random password.
- `PAYMENT_ADMIN_SESSION_SECRET`: at least 32 random characters.

Never put these credentials in client JavaScript or a public environment variable.
The session is an eight-hour signed HttpOnly/Secure/SameSite cookie. Password changes
invalidate prior sessions. Login attempts are limited in Redis. Use HTTPS.

When Redis is first connected, the existing `PAYTM_UPI_ID` is imported as the
initial active profile; `PAYTM_MID` is saved with it when configured. This happens
server-side, so Vercel Secret variables do not need to be downloaded or exposed.
The merchant display names still come from the existing `PAYTM_MERCHANT_NAME` /
`PHONEPE_MERCHANT_NAME` variables.

A Paytm MID is optional for manually managing and activating UPI profiles. Without
a matching MID and a supported Paytm merchant integration, payment status remains
pending and admins must verify payments independently before fulfilling orders.
Automatic switching is only based on a Paytm gateway-confirmed failure; a UPI ID
and MID alone do not prove that the gateway can find this website's order reference.

The panel supports up to **5 unique UPI profiles**, optionally paired with their
matching Paytm MIDs, ordered with the arrow controls. Add/edit/remove or
enable/disable, then Save profiles. Use Activate to manually select a saved
enabled profile. Reset failures clears its count.
Saving stale settings is rejected so another admin or a payment outcome cannot be
silently overwritten. Refresh status before retrying a stale save.

Routing rules:

- Three **distinct, consecutive gateway-confirmed failures** on the active profile
  switch new orders to the next enabled profile with fewer than three failures.
- A confirmed success resets that profile's streak. Outcomes are processed in
  confirmation order, not order-creation order.
- Pending/not-found statuses, API/network timeouts, modal cancellation and browser
  navigation do not count as failures. The existing PhonePe flow does not verify
  transactions, so PhonePe failures cannot contribute to automatic switching.
- Paytm response `334 / Invalid Order Id` is shown as a verification issue in the
  admin panel and is never counted as a confirmed failed payment. The current
  inherited direct UPI links/QR do not register a Paytm gateway order. A payment
  entry visible in a merchant dashboard is not proof that this generated website
  order ID can be queried through Paytm's gateway Order Status API. Reliable live
  switching requires a supported merchant integration that registers/reconciles
  the same order reference (or authenticated provider notifications). A UPI ID and
  MID alone do not establish that compatibility. Test coverage of mocked gateway
  responses does not verify a merchant's live integration.
- Repeated/concurrent verify requests count an order at most once. Terminal states
  are cached in Redis. Settings and outcomes use atomic Redis compare-and-set.
- Exhausted profiles are skipped. If no eligible profile remains, new payments pause
  until an administrator resets/activates a profile. The panel shows this state.
- Each new order stores its own UPI/MID/amount and profile epoch. Rotation, credential
  edits, deletion, or manual reactivation cannot move an existing order to a different
  MID. Old epochs do not affect freshly reset counters.
- References are retained for 30 days; recent activity is capped at 100 updates.
  Expired managed references return not-found, rather than being checked on another
  MID. This is a routing/activity ledger, not long-term financial accounting storage.

The same `/api/initiate-payment` and `/api/verify-payment` routes and response
fields remain in use. With Redis unconfigured the original environment-based flow
continues; with Redis configured, database errors fail safely instead of silently
changing merchant. Pre-migration short transaction IDs still verify using the
original environment MID. Keep `PAYTM_MID` set for those old orders.

Use the Upstash **Free** plan with `autoUpgrade=false` and `eviction=false` if you
want no automatic paid upgrades and no silent eviction of order records. Monitor
the free quota; reaching a quota/database outage can temporarily stop managed
checkout. Production and Preview should use separate databases for isolated
testing; never generate fake payment outcomes against the production routing keys.

Verification: `npm test` includes profile validation, failure streak/reset,
1 → 2 → 3 rotation, all-profiles-exhausted behavior, idempotency/concurrency,
MID snapshots, initiation/verification compatibility, and admin authentication.
Gateway outcomes in those tests are mocked; no real payment is initiated.

## Deploying this prebuilt archive

Deploy the complete project directory containing `vercel.json`, `package.json`,
`api/`, `lib/`, and `assets/`. Set the Vercel Root Directory to that directory.
The checked-in configuration selects Other (no framework), runs `npm run build`,
and publishes `public/`. The build copies the existing compiled storefront and
validates its local script/style references; no Vite source compilation is needed.
Keep `api/` at the project root so Vercel can deploy its Node functions. Do not
deploy only `public/` for a working checkout.

Static files and functions resolve before SPA navigation. Missing `/assets/*`,
`/api/*`, and file-like paths return 404 rather than `index.html`. Routes such as
`/payment`, `/checkout`, and `/product/1` still load the SPA. Root-relative URLs
assume deployment at the domain root, not under a subdirectory.

After deploying, check these URLs on your own deployment:

- `/assets/index-MzB9xETE.js?v=14`
- `/assets/store-pixels.js?v=8`
- `/assets/cashfree-checkout.js?v=21`

Each must return 200 with JavaScript content, not HTML. A made-up asset such as
`/assets/missing.js` must return 404. Check `/api/settings` returns JSON, and verify
checkout with your configured merchant test environment. If requests still return
HTML, confirm the new deployment is active and check any external proxy/rewrite.

Despite its filename, `cashfree-checkout.js` implements this project's existing
PhonePe/Paytm/QR flow, not the Cashfree SDK.

The old MongoDB receipt-ledger payment implementation has been removed. This
store now uses the same flow as `Kitchan`:

1. `/api/initiate-payment` creates a `TXN...` order reference and returns the
   PhonePe, Paytm and UPI QR links.
2. PhonePe opens its native collect screen and keeps the waiting loader open.
   It is intentionally not tracked, matching Kitchan.
3. Paytm and Scan QR start `/api/verify-payment` long polling.
4. The API checks Paytm Order Status using `PAYTM_MID` + the transaction ID.
5. A confirmed transaction opens `success.html`, which shows the Kitchan thank
   you message and transaction details. A terminal failure opens `failed.html`.

The target store's existing server-side product pricing remains enabled, so a
browser cannot choose its own payable amount.

## Environment variables

Copy `.env.example` into your deployment environment and set:

- `PAYTM_UPI_ID` (required): receiver UPI VPA.
- `PAYTM_MERCHANT_NAME`: name displayed by Paytm and in the UPI QR.
- `PHONEPE_MERCHANT_NAME`: name displayed by PhonePe.
- `PAYTM_MID` (optional for manual UPI switching; needed for Paytm API tracking):
  Paytm merchant ID.
- `PAYTM_ENV=test` only when using Paytm staging; omit it for production.
- `NEXT_PUBLIC_META_PIXEL_ID` and `NEXT_PUBLIC_META_EXTRA_PIXELS` are optional.

If `PAYTM_MID` is not set, Paytm/QR verification remains pending, exactly as in
Kitchan. This project needs Vercel or another host that supports Node serverless
functions; static-only hosting cannot run the two payment APIs.

## Payment UI behavior

- PhonePe is selected by default.
- The three methods are PhonePe, Paytm and Scan QR.
- Paytm/PhonePe show the sticky verification modal. The cancel action appears
  after 60 seconds; Paytm keeps polling while the modal is active.
- Scan QR supports download/share, shows the five-minute countdown and starts
  Paytm status tracking immediately.
- The Android/browser back button is guarded while a payment modal is open.

## Verification

Run `npm test`. The tests cover authoritative pricing, intent contents, Paytm
success/failure/pending mapping, API validation, pixel events and existing
storefront invariants. No live payment is performed by the test suite.
