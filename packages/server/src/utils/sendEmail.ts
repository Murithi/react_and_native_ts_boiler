import * as nodemailer from "nodemailer";
// Generate SMTP service account from ethereal.email

export const sendEmail = async (
  recipient: string,
  url: string,
  linkText: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  // Message object
  const message = {
    from: "Sender Name <sender@example.com>",
    to: `Recipient <${recipient}>`,
    subject: "Confirm Email",
    text: "Confirm your email!",
    html: `
    <html>
    <body>
      <p> Testing Email</p>
      <a href="${url}">${linkText}</a>
    </body>
    </html>
    `
  };

  transporter.sendMail(message, (err: any, info: any) => {
    if (err) {
      console.log("Error occurred. " + err.message);
    }

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};
