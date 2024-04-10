import { dbConnect } from "@/app/lib/db";
import UserModel from "@/models/userModel";
// export async function GET(req: Request, res: Response) {
//   try {
//     await dbConnect();
//     const users = await UserModel.find();
//     return Response.json({ users }, { status: 200 });
//   } catch (err) {
//     return Response.json({ err }, { status: 500 });
//   }
// }

async function getLatestUsers() {
  await dbConnect(); // Reconnect to the database
  const users = await UserModel.find();
  return users;
}

export async function GET(req: Request, res: Response) {
  try {
    const users = await getLatestUsers();
    return Response.json({ users }, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
