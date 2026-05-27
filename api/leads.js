export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({ ok: false, error: "WEBHOOK_URL is not configured" });
    }

    const payload = req.body || {};

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return res.status(502).json({ ok: false, error: "Webhook delivery failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}
