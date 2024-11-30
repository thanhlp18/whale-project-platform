import { Theme } from "next-auth";
import { SendVerificationRequestParams } from "next-auth/providers/email";
import { createTransport } from "nodemailer";

export async function sendVerificationRequest(
  params: SendVerificationRequestParams
) {
  const { identifier, url, provider, theme, token } = params;
  const { host } = new URL(url);
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server);
  await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `[${token}] is your login verification code on WhaleProject`,
    text: text({ url, host, token }),
    html: html({ url, host, theme, token }),
  });
}

function html(params: {
  url: string;
  host: string;
  theme: Theme;
  token: string;
}) {
  const { url, host, theme, token } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
              <a href="${url}" target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">
                Sign in
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Or, enter the verification code below on the sign-in page:
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: ${color.text}; font-weight: bold;">
        ${token}
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({
  url,
  host,
  token,
}: {
  url: string;
  host: string;
  token: string;
}) {
  return (
    `Sign in to ${host}\n\n` +
    `Click the link below to sign in:\n${url}\n\n` +
    `Or, enter the following verification code on the sign-in page:\n` +
    `${token}\n\n` +
    `If you did not request this email, you can safely ignore it.`
  );
}
