import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to:
      process.env.NODE_ENV !== "development"
        ? email
        : "hashamsaleem75@gmail.com",
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to conform email</p>`,
  });
};

const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/new-password?token=${token}`;
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to:
      process.env.NODE_ENV !== "development"
        ? email
        : "hashamsaleem75@gmail.com",
    subject: "Reset your Password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });
};

const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to:
      process.env.NODE_ENV !== "development"
        ? email
        : "hashamsaleem75@gmail.com",
    subject: "2FA Code",
    html: `<p>Your 2FA Code: ${token}</p>`,
  });
};

export {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendTwoFactorTokenEmail,
};
