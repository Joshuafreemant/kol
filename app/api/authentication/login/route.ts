import { dbConnect } from "@/app/lib/db";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const data: any = await req.json();

  try {
    await dbConnect();

    const { email, phone_number, password } = data;

    if (!password) {
      return Response.json({ message: "Password is required." }, { status: 400 });
    }

    if (!email && !phone_number) {
      return Response.json(
        { error: "Please provide an email address or phone number." },
        { status: 400 }
      );
    }

    // Look up user by whichever identifier was supplied
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
    }

    const isCorrect = bcrypt.compareSync(password.toLowerCase(), user.password);
    if (!isCorrect) {
      return Response.json({ message: "Wrong password." }, { status: 400 });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_KEY as string
    );

    const { password: _pw, ...info } = user._doc;
    return Response.json({ ...info, token }, { status: 200 });

  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}