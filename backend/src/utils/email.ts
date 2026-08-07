import nodemailer from 'nodemailer';
import { config } from '../config/env';
import logger from './logger';

export const sendPasswordResetEmail = async (
  email: string,
  resetLink: string
): Promise<void> => {
  const smtpConfigured = config.emailHost && config.emailUser && config.emailPass;
  if (!smtpConfigured) {
    logger.info(`[EMAIL_DISABLED] Password reset link for ${email}: ${resetLink}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPort,
    secure: config.emailPort === 465,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });

  await transporter.sendMail({
    from: `"Volleyball Mtaa Nairobi" <${config.emailUser}>`,
    to: email,
    subject: 'Reset your Volleyball Mtaa Nairobi password',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="color:#0a2540;">Reset your password</h2>
        <p>You requested to reset your password. Click the button below to choose a new one.</p>
        <p><a href="${resetLink}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;">Reset password</a></p>
        <p style="color:#6b7280;font-size:13px;">If you did not request this, you can safely ignore this email. This link expires in 10 minutes.</p>
      </div>
    `,
  });

  logger.info(`Password reset email sent to ${email}`);
};
