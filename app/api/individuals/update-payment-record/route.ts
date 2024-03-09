import { dbConnect } from "@/app/lib/db";
import { sendNotificationEmail } from "@/app/lib/util";
import PaymentRecordModel from "@/models/PaymentModel";
import UserModel from "@/models/userModel";

export async function POST(req: Request, res: Response) {
  const data: any = await req.json();
  if (!data.amount) {
    return Response.json({ error: "Amount is required" }, { status: 400 });
  }
  if (!data.date) {
    return Response.json({ error: "date is required" }, { status: 400 });
  }


  try {
    await dbConnect();
    const updatedUserPayment = await PaymentRecordModel.findByIdAndUpdate(
      data._id,
      { $set: data },
      { new: true }
    );
    const user:any = await UserModel.findOne({ _id: data.individual });

    sendNotificationEmail(user.email, user.firstname, "A New Payment Update has just been made on");

    const updatedPaymentData=updatedUserPayment
    return Response.json({updatedPaymentData, message:"Payment updated Successfully" }, { status: 200 });
    
  } catch (error) {
    return Response.json({error, message:"Payment Not created" }, { status: 500 });

  }
}
