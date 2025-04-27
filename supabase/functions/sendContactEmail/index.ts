import { serve } from 'https://deno.land/x/sift@0.5.0/mod.ts';

const RESEND_API_KEY = Deno.env.get('re_HWwC5jGk_NiGWykHLQ4ZySfY3uZK4mmC4');
const TO_EMAIL = Deno.env.get('NOTIFY_EMAIL')!;
const FROM_EMAIL = Deno.env.get('FROM_EMAIL')!;

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { name, email, message } = await req.json();

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `New message from ${name}`,
        text: `Email: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
});
