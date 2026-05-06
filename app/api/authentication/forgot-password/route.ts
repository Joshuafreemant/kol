import { dbConnect } from "@/app/lib/db";
import { sendResetEmail } from "@/app/lib/util";
import UserModel from "@/models/userModel";
import { randomBytes } from "crypto";

/** Masks an email for safe display: in***@gmail.com */
function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}

export async function POST(req: Request) {
  const data: any = await req.json();

  try {
    await dbConnect();

    const { email, phone_number } = data;

    // Must supply at least one identifier
    if (!email && !phone_number) {
      return Response.json(
        { error: "Please enter your email address or phone number." },
        { status: 400 }
      );
    }

    // Look up the user by whichever identifier was provided
    let user: any = null;

    if (email) {
      user = await UserModel.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        return Response.json({ error: "No account found with that email address." }, { status: 400 });
      }
    } else {
      user = await UserModel.findOne({ phone_number: phone_number.trim() });
      if (!user) {
        return Response.json({ error: "No account found with that phone number." }, { status: 400 });
      }
      // Phone lookup still requires the account to have an email to send the link
      if (!user.email) {
        return Response.json(
          { error: "No email address is associated with this account. Please contact support." },
          { status: 400 }
        );
      }
    }

    // Generate and store the reset token
    const resetToken = randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Always send the link to the account's email
    await sendResetEmail(user.email, resetToken);

    return Response.json({
      message: "Reset instructions sent successfully.",
      email: maskEmail(user.email), // safe to expose — masked
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}