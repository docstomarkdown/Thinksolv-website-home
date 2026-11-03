// Applying for leave from thinksolv.com/leave: this server checks reCAPTCHA, then passes the request to the Thinksolv workspace, which
// checks the employee ID and security PIN and files the leave. The visitor's browser never talks to the workspace.
//
// Needs, on the server (Vercel project settings):
//   RECAPTCHA_SECRET_KEY    already used by the contact form
//   LEAVE_RELAY_SECRET      a long random string; the workspace has the same value as its LEAVE_RELAY_SECRET
//   WORKSPACE_URL           optional, default https://workspace.thinksolv.com
//   CF_ACCESS_CLIENT_ID / CF_ACCESS_CLIENT_SECRET
//                           a Cloudflare Access service token; when both are set they are sent with the call, so the workspace's
//                           Access policy on /api/leave-public/* can allow this server alone ("Service Auth" instead of "Bypass")

const WORKSPACE_URL = (process.env.WORKSPACE_URL || 'https://workspace.thinksolv.com').replace(/\/+$/, '');
const FIELDS = ['employeeId', 'securityPin', 'fromDate', 'toDate', 'dayPart', 'reason'];

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded || '').split(',')[0].trim();
  return first || req.headers['x-real-ip'] || req.socket?.remoteAddress || '';
}

export async function handleLeaveApply(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  try {
    const body = req.body && typeof req.body === 'object' ? req.body : {};
    const captcha = typeof body.captcha === 'string' ? body.captcha : '';

    // 1. reCAPTCHA v3, checked here with the secret — before the workspace is asked anything.
    if (!captcha) return res.status(400).json({ ok: false, error: 'The security check did not complete. Please try again.' });
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      // Unlike the contact form, this never skips the check: it guards PINs.
      console.error('leave: RECAPTCHA_SECRET_KEY is not set');
      return res.status(500).json({ ok: false, error: 'Applying for leave is not available right now.' });
    }
    const verify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: process.env.RECAPTCHA_SECRET_KEY, response: captcha }),
    });
    const verdict = await verify.json();
    if (!verdict.success || verdict.score < 0.5) {
      return res.status(400).json({ ok: false, error: 'The security check did not pass. Please refresh the page and try again.' });
    }

    // 2. The workspace, with the shared secret.
    if (!process.env.LEAVE_RELAY_SECRET) {
      console.error('leave: LEAVE_RELAY_SECRET is not set');
      return res.status(500).json({ ok: false, error: 'Applying for leave is not available right now.' });
    }
    const payload = { clientIp: clientIp(req) };
    for (const key of FIELDS) if (typeof body[key] === 'string') payload[key] = body[key];

    const headers = { 'Content-Type': 'application/json', 'X-Leave-Relay-Secret': process.env.LEAVE_RELAY_SECRET };
    if (process.env.CF_ACCESS_CLIENT_ID && process.env.CF_ACCESS_CLIENT_SECRET) {
      headers['CF-Access-Client-Id'] = process.env.CF_ACCESS_CLIENT_ID;
      headers['CF-Access-Client-Secret'] = process.env.CF_ACCESS_CLIENT_SECRET;
    }
    const response = await fetch(`${WORKSPACE_URL}/api/leave-public/apply`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    let result = null;
    try {
      result = await response.json();
    } catch {
      /* not JSON: handled below */
    }
    if (result && result.ok === true) return res.status(200).json({ ok: true, message: result.message });
    if (result && typeof result.error === 'string' && response.status < 500) return res.status(400).json({ ok: false, error: result.error });
    console.error('leave: the workspace answered', response.status);
    return res.status(502).json({ ok: false, error: 'Could not reach Thinksolv right now. Please try again in a moment.' });
  } catch (error) {
    console.error('leave: failed', error);
    return res.status(502).json({ ok: false, error: 'Could not reach Thinksolv right now. Please try again in a moment.' });
  }
}
