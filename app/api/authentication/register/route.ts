import { dbConnect } from "@/app/lib/db";
import { sendWelcomeEmail } from "@/app/lib/util";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req: Request, res: Response) {
  const data: any = await req.json();

  await dbConnect();
  const existingUserWithEmail = await UserModel.findOne({ email: data.email });

  if (existingUserWithEmail) {
    return Response.json({ error: "Email is already taken" }, { status: 400 });
  }
  if (!data.firstname.length) {
    return Response.json(
      { error: "Provide a valid Firstname" },
      { status: 400 }
    );
  }
  if (!data.lastname.length) {
    return Response.json(
      { error: "Provide a valid Lastname" },
      { status: 400 }
    );
  }
  if (!data.email.length) {
    return Response.json(
      { error: "Provide a valid Email Address" },
      { status: 400 }
    );
  }
  if (data.password.length < 6) {
    return Response.json(
      { error: "Provide a password greater than 6" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const hash = bcrypt.hashSync(data.password, 5);
    const user = await UserModel.create({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone_number: data.phone_number,
      password: hash,
    });
    sendWelcomeEmail(data.email, data.firstname);
    return Response.json(
      { data: user, message:"User created Successfully" },
    );
  } catch (error) {}

  
}
