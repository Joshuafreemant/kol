import { dbConnect } from "@/app/lib/db";
import { sendResetEmail } from "@/app/lib/util";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req: Request, res: Response) {
  const data: any = await req.json();

  await dbConnect();

  if (!data?.password) {
    return Response.json({ error: "Please enter password" }, { status: 400 });
  }

  try {
    const existingUserWithToken = await UserModel.findOne({
      resetPasswordToken: data?.resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!existingUserWithToken) {
      return Response.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    const hash = bcrypt.hashSync(data.password, 5);
    existingUserWithToken.password = hash;
    existingUserWithToken.resetPasswordToken = "";
    existingUserWithToken.resetPasswordExpires = undefined;

    await existingUserWithToken.save();

    return Response.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({
      error,
      message: "Error Changing Status",
    });
  }
}
