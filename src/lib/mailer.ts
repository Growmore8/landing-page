import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactSalesEmail(data: {
  fullName: string;
  workEmail: string;
  phone?: string;
  plan?: string;
  country?: string;
  companyWebsite?: string;
  companyName: string;
  message?: string;
}) {
  const row = (label: string, value?: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eef0f5;color:#6b7280;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;width:160px;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #eef0f5;color:#111827;font-size:14px;vertical-align:top;">
        ${value && value.trim() ? value : "—"}
      </td>
    </tr>`;

  const html = `
  <div style="background:#f4f5f9;padding:32px 16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">
      <tr>
        <td style="padding:0;">
          <div style="height:3px;background:linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4);"></div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px 20px;border-bottom:1px solid #eef0f5;">
          <table role="presentation" width="100%">
            <tr>
              <td style="vertical-align:middle;">
                <span style="display:inline-block;vertical-align:middle;font-size:17px;font-weight:800;color:#111827;letter-spacing:-0.5px;">
                  Orbit<span style="color:#6366f1;">FX</span> Solution
                </span>
              </td>
              <td align="right" style="vertical-align:middle;">
                <span style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6366f1;background:#eef0ff;padding:5px 10px;border:1px solid #e0e3ff;">
                  New Sales Inquiry
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px 8px;">
          <h1 style="margin:0 0 4px;font-size:18px;font-weight:800;color:#111827;">
            ${data.companyName}
          </h1>
          <p style="margin:0;font-size:13px;color:#6b7280;">
            Submitted via the Contact Sales form on orbitfxsolution.com
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px 8px;">
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            ${row("Full Name", data.fullName)}
            ${row("Work Email", data.workEmail)}
            ${row("Phone", data.phone)}
            ${row("Plan", data.plan)}
            ${row("Country", data.country)}
            ${row("Company Website", data.companyWebsite)}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 32px 28px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;margin-bottom:8px;">
            Message
          </div>
          <div style="background:#f9fafb;border:1px solid #eef0f5;padding:14px 16px;font-size:13px;line-height:1.6;color:#374151;white-space:pre-line;">
            ${data.message && data.message.trim() ? data.message : "No message provided."}
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px;border-top:1px solid #eef0f5;background:#fafbfc;">
          <p style="margin:0;font-size:11px;color:#9ca3af;">
            OrbitFX Solution · This is an automated notification from your website's Contact Sales form.
          </p>
        </td>
      </tr>
    </table>
  </div>`;

  await transporter.sendMail({
    from: `"OrbitFX Solution" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO,
    replyTo: data.workEmail,
    subject: `New Sales Inquiry — ${data.companyName}`,
    text: `
Full Name: ${data.fullName}
Work Email: ${data.workEmail}
Phone: ${data.phone || "-"}
Plan: ${data.plan || "-"}
Country: ${data.country || "-"}
Company Website: ${data.companyWebsite || "-"}
Company Name: ${data.companyName}

Message:
${data.message || "-"}
    `.trim(),
    html,
  });
}