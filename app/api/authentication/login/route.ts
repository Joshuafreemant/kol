import { dbConnect } from "@/app/lib/db";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request, res: Response) {
  const data: any = await req.json();

  try {
    await dbConnect();
    const existingUserWithEmail: any = await UserModel.findOne({
      email: data.email,
    });

    if (!existingUserWithEmail) {
      return Response.json({ error: "User Not found" }, { status: 400 });
    } else {
      const isCorrect = bcrypt.compareSync(
        data.password,
        existingUserWithEmail.password
      );
      if (!isCorrect)
        return Response.json(
          { message: "Wrong Password or Username" },
          { status: 400 }
        );

      const token = jwt.sign(
        { id: existingUserWithEmail._id },
        //@ts-ignore
        process.env.JWT_KEY
      );
      const { password, ...info } = existingUserWithEmail._doc;
      return Response.json({ ...info, token }, { status: 200 });
    }
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
