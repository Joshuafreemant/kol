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
    const payment = await PaymentRecordModel.create({
      individual: data.individual,
      lastname: data.lastname,
      date: data.date,
      amount: data.amount,
      shares: data.shares,
      savings: data.savings,
      loans: data.loans,
      At: new Date(),
      building_fund: data.building_fund,
      investment_fund: data.investment_fund,
      user: "Tolulope",
    });

    const user:any = await UserModel.findOne({ _id: data.individual });

     sendNotificationEmail(user.email, user.firstname, "A New Payment Record has just been added to");

    return Response.json({data: payment, message:"Payment created Successfully" }, { status: 200 });
    
  } catch (error) {
    return Response.json({error, message:"Payment Not created" }, { status: 500 });

  }
}
