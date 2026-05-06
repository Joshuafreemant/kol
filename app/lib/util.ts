import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "tolexjoshua@gmail.com",
    pass: "xnac kxrm olkj hpoj",
  },
});

const sendWelcomeEmail = async (email: string, name: string) => {
  const mailOptions = {
    from: "tolexjoshua@gmail.com",
    to: email,
    subject: "Welcome to KOL!",
    text: `Dear ${name},\n\n🎉 Welcome to KOL Cooperative Society! 🎉\nYour account approval is underway. Once approved, access your financial records and more!\n\nThe KOL Cooperative Society Team 🚀`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

const sendResetEmail = async (email: string, resetToken: string) => {
  const mailOptions = {
    from: "tolexjoshua@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password:\n\nhttps://bodijaibkolcics.org.ng/reset/${resetToken}\n\nThis link expires in 1 hour.\n\nIf you did not request a password reset, please ignore this email.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Reset email sent:", info.response);
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw error; // re-throw so the API route can catch it
  }
};

const sendApprovedEmail = async (email: string, name: string) => {
  const mailOptions = {
    from: "tolexjoshua@gmail.com",
    to: email,
    subject: "KOL Membership Approved!",
    text: `Dear ${name},\n\n🎉 Congratulations! Your account has been approved! 🎉\n\nYou can now log in to access your financial records and enjoy all the features of KOL Cooperative Society.\n\nWelcome aboard!\n\nThe KOL Cooperative Society Team 🚀`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Approved email sent:", info.response);
  } catch (error) {
    console.error("Error sending approved email:", error);
  }
};

const sendNotificationEmail = async (email: string, name: string, text: string) => {
  const mailOptions = {
    from: "tolexjoshua@gmail.com",
    to: email,
    subject: "KOL New Payment Record!",
    text: `Dear ${name},\n\n${text} your dashboard 🎉.\n\nLogin here to view your records.\n\nThe KOL Cooperative Society Team 🚀`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Notification email sent:", info.response);
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
};

export { sendWelcomeEmail, sendApprovedEmail, sendNotificationEmail, sendResetEmail };