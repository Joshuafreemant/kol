import { dbConnect } from "@/app/lib/db";
import PaymentRecordModel from "@/models/PaymentModel";
import UserModel from "@/models/userModel";
export async function GET(req: Request, res: Response) {
  try {
    await dbConnect();
    const segments = req.url.split("/");
    const id = segments[segments.length - 1];
    const userRecord = await UserModel.find({ _id: id })
    return Response.json({ data: userRecord }, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
