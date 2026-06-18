# THE storefront

Premium responsive fashion storefront with catalog, product details, cart, checkout, account, chat, multilingual UI and Supabase integration.

## Run locally

```bash
npm start
```

Open `http://localhost:4173`.

## Stripe

Stripe Checkout is handled by `server.js`, not by the browser app. Start the server with a real Stripe secret or restricted key in the environment:

```bash
STRIPE_SECRET_KEY=sk_test_replace_me npm start
```

Stripe secret keys must stay on the server. Do not commit them to GitHub and do not put them in `app.js`, `index.html`, or `supabase-config.js`.

The storefront uses KZT prices as whole tenge and sends Stripe amounts in minor units with `STRIPE_AMOUNT_MULTIPLIER=100` by default.

## Supabase

The browser app uses only the public `anon` key from `supabase-config.js`.

Do not put the `service_role` key into frontend files. Keep it only in a backend or Supabase Edge Function environment variable for trusted server-side CRM, payment, admin, or webhook work.

Create the database tables by running `supabase-schema.sql` in the Supabase SQL editor. Until the schema exists, the storefront keeps working locally and Supabase writes silently fall back.
