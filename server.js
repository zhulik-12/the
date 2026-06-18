const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripeCurrency = (process.env.STRIPE_CURRENCY || "kzt").toLowerCase();
const amountMultiplier = Number(process.env.STRIPE_AMOUNT_MULTIPLIER || 100);

const products = {
  "wool-coat": { name: "Soft wool coat", price: 159000 },
  "silk-shirt": { name: "Ivory silk shirt", price: 64900 },
  "tailored-trousers": { name: "High-rise tailored trousers", price: 72900 },
  "cashmere-knit": { name: "Cashmere jumper", price: 89900 },
  "linen-blazer": { name: "Linen blazer", price: 124000 },
  "ribbed-dress": { name: "Ribbed knit dress", price: 76900 },
  "leather-bag": { name: "Leather tote bag", price: 112000 },
  "chelsea-boots": { name: "Leather Chelsea boots", price: 139000 },
};

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".sql": "text/plain; charset=utf-8",
};

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body is too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function requestOrigin(req) {
  const host = req.headers.host || `localhost:${port}`;
  return `${req.socket.encrypted ? "https" : "http"}://${host}`;
}

async function createStripeCheckoutSession(req, res) {
  if (!/^(sk|rk)_(test|live)_/.test(stripeSecretKey)) {
    sendJson(res, 500, {
      error:
        "STRIPE_SECRET_KEY must be a Stripe secret or restricted key that starts with sk_test_, sk_live_, rk_test_, or rk_live_. Never use it in frontend code.",
    });
    return;
  }

  let payload;
  try {
    payload = await readJson(req);
  } catch (error) {
    sendJson(res, 400, { error: error.message });
    return;
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  const orderId = String(payload.orderId || "");
  if (!items.length || !orderId) {
    sendJson(res, 400, { error: "Missing checkout items or order id." });
    return;
  }

  const form = new URLSearchParams();
  const origin = requestOrigin(req);
  form.set("mode", "payment");
  form.set("success_url", `${origin}/#account?payment=success&session_id={CHECKOUT_SESSION_ID}`);
  form.set("cancel_url", `${origin}/#cart?payment=cancelled`);
  form.set("metadata[order_id]", orderId);

  items.forEach((item, index) => {
    const product = products[item.product_id];
    const quantity = Math.max(1, Math.min(20, Number(item.qty || 1)));
    if (!product) return;
    form.set(`line_items[${index}][quantity]`, String(quantity));
    form.set(`line_items[${index}][price_data][currency]`, stripeCurrency);
    form.set(`line_items[${index}][price_data][unit_amount]`, String(Math.round(product.price * amountMultiplier)));
    form.set(`line_items[${index}][price_data][product_data][name]`, product.name);
  });

  try {
    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    });
    const data = await stripeResponse.json();
    if (!stripeResponse.ok) {
      sendJson(res, stripeResponse.status, { error: data.error?.message || "Stripe checkout failed." });
      return;
    }
    sendJson(res, 200, { id: data.id, url: data.url });
  } catch {
    sendJson(res, 502, { error: "Unable to reach Stripe API." });
  }
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://localhost:${port}`);
  const safePath = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(root, safePath === "/" ? "index.html" : safePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/create-checkout-session") {
    createStripeCheckoutSession(req, res);
    return;
  }
  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }
  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(port, () => {
  console.log(`THE storefront running at http://localhost:${port}`);
});
