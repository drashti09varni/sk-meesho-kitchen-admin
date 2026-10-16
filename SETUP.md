# Kitchan payment flow setup

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
- `PAYTM_MID` (required for tracking): Paytm merchant ID.
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
