import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

/* ------------------------------------------------------------------ */
/* 1.  Hard-coded Gmail credentials (⚠️ only for quick demo)          */
/* ------------------------------------------------------------------ */
const GMAIL_USER = 'k9268.sukitha@gmail.com';
const GMAIL_PASS = 'qzjlynmixbjbgktp';   // ← your 16-char app-password

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: GMAIL_USER, pass: GMAIL_PASS }
});

/* ------------------------------------------------------------------ */
/* 2.  Callable HTTPS function                                       */
/* ------------------------------------------------------------------ */
interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export const sendReply = functions.https.onCall({
  memory: '256MiB',
  timeoutSeconds: 30,
}, async (request): Promise<{ success: true }> => {
    // 2-a  Auth check (optional – remove if you don’t use Firebase Auth)
    if (!request.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Login required');
    }

    // 2-b  Payload validation
    const { to, subject, html } = request.data as EmailData;
    if (!to || !subject || !html) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing fields');
    }

    // 2-c  Send mail
    await transporter.sendMail({
      from: `"Your Company" <${GMAIL_USER}>`,
      to,
      subject,
      html
    });

    return { success: true };
  });