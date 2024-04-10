import { dbConnect } from "@/app/lib/db";
import UserModel from "@/models/userModel";
export async function GET(req: Request, res: Response) {
  try {
    await dbConnect();
    const users = await UserModel.find();
    return Response.json({ users }, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}