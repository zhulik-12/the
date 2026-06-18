# THE storefront

Premium responsive fashion storefront with catalog, product details, cart, checkout, account, chat, multilingual UI and Supabase integration.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Supabase

The browser app uses only the public `anon` key from `supabase-config.js`.

Do not put the `service_role` key into frontend files. Keep it only in a backend or Supabase Edge Function environment variable for trusted server-side CRM, payment, admin, or webhook work.

Create the database tables by running `supabase-schema.sql` in the Supabase SQL editor. Until the schema exists, the storefront keeps working locally and Supabase writes silently fall back.
