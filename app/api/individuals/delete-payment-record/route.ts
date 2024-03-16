import { dbConnect } from "@/app/lib/db";
import { sendNotificationEmail } from "@/app/lib/util";
import PaymentRecordModel from "@/models/PaymentModel";
import UserModel from "@/models/userModel";

export async function POST(req: Request, res: Response) {
  const data: any = await req.json();
  console.log("data",data)
  if (!data._id) {
    return Response.json({ error: "Payment Record invalid" }, { status: 400 });
  }
  try {
    await dbConnect();
   
    await PaymentRecordModel.findByIdAndDelete(data._id);

    const user:any = await UserModel.findOne({ _id: data.individual });

    sendNotificationEmail(user.email, user.firstname, "A New Payment Record has just been deleted on");

    // const updatedPaymentData=deletedUserPayment
    const userPayment = await PaymentRecordModel.find({individual:data.individual});

    return Response.json({userPayment, message:"Payment Record Deleted Successfully" }, { status: 200 });
    
  } catch (error) {
    return Response.json({error, message:"Payment Not Deleted" }, { status: 500 });

  }
}
