import { dbConnect } from "@/app/lib/db";
import { sendResetEmail } from "@/app/lib/util";
import UserModel from "@/models/userModel";
import { randomBytes } from "crypto";

export async function POST(req: Request, res: Response) {
  const data: any = await req.json();

  try {
    await dbConnect();

    if (!data?.email) {
      return Response.json({ error: "Please enter email" }, { status: 400 });
    }
    const existingUserWithEmail: any = await UserModel.findOne({
      email: data.email,
    });
    if (!existingUserWithEmail) {
      return Response.json({ error: "User Not Found" }, { status: 400 });
    }

    const resetToken = randomBytes(20).toString('hex');
    existingUserWithEmail.resetPasswordToken = resetToken;
    existingUserWithEmail.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await existingUserWithEmail.save();

    sendResetEmail(data.email, resetToken);
    return Response.json({
      message: "Reset Instructions sent Successfully",
    });
    
  } catch (error) {
    return Response.json({
      error,
      message: "Error Changing Status",
    });
  }
}


//     const { resetToken, newPassword } = req.body;
//     try {
//       const user = await User.findOne({
//         resetPasswordToken: resetToken,
//         resetPasswordExpires: { $gt: Date.now() },
//       });
  
//       if (!user) {
//         return res
//           .status(400)
//           .json({ message: "Invalid or expired reset token" });
//       }
//       const hash = bcrypt.hashSync(newPassword, 5);
//       user.password = hash;
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpires = undefined;
  
//       await user.save();
  
//       res.json({ message: "Password reset successful" });
//     } catch (error) {
//       console.error("Error resetting password:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };