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

function originFromRequest(req) {
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";
  return `${proto}://${host}`;
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

module.exports = async function createCheckoutSession(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  if (!/^(sk|rk)_(test|live)_/.test(stripeSecretKey)) {
    sendJson(res, 500, {
      error:
        "STRIPE_SECRET_KEY must be a Stripe secret or restricted key that starts with sk_test_, sk_live_, rk_test_, or rk_live_. Never use it in frontend code.",
    });
    return;
  }

  const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const items = Array.isArray(payload.items) ? payload.items : [];
  const orderId = String(payload.orderId || "");

  if (!items.length || !orderId) {
    sendJson(res, 400, { error: "Missing checkout items or order id." });
    return;
  }

  const form = new URLSearchParams();
  const origin = originFromRequest(req);
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
};
