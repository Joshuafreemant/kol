import { dbConnect } from "@/app/lib/db";
import { sendApprovedEmail, sendWelcomeEmail } from "@/app/lib/util";
import UserModel from "@/models/userModel";

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();
    const data: any = await req.json();
  
    const updatedUser: any = await UserModel.findByIdAndUpdate(
      data.id,
      { $set: { status: data.status } }, // Only update the status field
      { new: true }
    );
    const { password, ...updatedInfo } = updatedUser;
    sendApprovedEmail(updatedUser._doc.email, updatedUser._doc.firstname);

    const allUsers: any = await UserModel.find();
    return Response.json({
      data: allUsers,
      message: "User status changed Successfully",
    });
  } catch (error) {
    return Response.json({
      error,
      message: "Error Changing Status",
    });
  }
}
