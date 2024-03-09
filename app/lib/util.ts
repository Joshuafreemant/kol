import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // Set up your email transport configuration
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "tolexjoshua@gmail.com",
    pass: "xnac kxrm olkj hpoj",
  },
});

const sendWelcomeEmail = (email: string, name: string) => {
  const welcomeMessage = `
  Dear ${name},
  🎉 Welcome to KOL Cooperative Society! 🎉
  Your account approval is underway. Once approved, access your financial records and more! Stay tuned for updates.
  The KOL Cooperative Society Team 🚀
  `;

  const mailOptions = {
    from: "kola@gmail.com",
    to: email,
    subject: "Welcome to KOL!",
    text: welcomeMessage,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.error("Error sending  email:", error);
    } else {
      console.log(" email sent:", info.response);
    }
  });
};

const sendApprovedEmail = (email: string, name: string) => {
  const welcomeMessage = `
  Dear ${name},
  
  🎉 Congratulations! Your account has been
  approved! 🎉

  You can now log in to access your financial records 
  and enjoy all the features of KOL Cooperative Society.

  Welcome aboard!

  The KOL Cooperative Society Team 🚀
  `;

  const mailOptions = {
    from: "kola@gmail.com",
    to: email,
    subject: "Welcome to KOL Membership Approved!",
    text: welcomeMessage,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.error("Error sending  email:", error);
    } else {
      console.log(" email sent:", info.response);
    }
  });
};
const sendNotificationEmail = (email: string, name: string, text:any) => {
  const welcomeMessage = `
  Dear ${name},
  ${text}
  your dashboard 🎉.
  Login here to view

  The KOL Cooperative Society Team 🚀
  `;

  const mailOptions = {
    from: "kola@gmail.com",
    to: email,
    subject: "KOL New payment Record!",
    text: welcomeMessage,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.error("Error sending  email:", error);
    } else {
      console.log(" email sent:", info.response);
    }
  });
};

export { sendWelcomeEmail,sendApprovedEmail,sendNotificationEmail };
