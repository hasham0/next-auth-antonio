import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "hashamsaleem75@gmail.com",
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to conform email</p>`,
  });
};

export default sendVerificationEmail;
