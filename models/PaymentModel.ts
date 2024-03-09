import { Document, Model } from "mongoose";
import * as Mongoose from "mongoose";

const paymentRecordSchema = new Mongoose.Schema({
  individual: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
 
  },
  shares: {
    debit: String,
    credit: String,
    balance: String,
  },
  savings: {
    debit: String,
    credit: String,
    balance: String,
  },
  loans: {
    debit: String,
    credit: String,
    balance: String,
    interest: String,
  },
  building_fund: {
    debit: String,
    credit: String,
    balance: String,
  },
  investment_fund: {
    debit: String,
    credit: String,
    balance: String,
  },
  user: {
    type: String,
  },
  certified_by: {
    type: String,
  },
});
interface IPaymentRecord {
    individual: string;
    date: string;
    amount: string;
    shares: any;
    savings: any;
    loans: any;
    building_fund: any;
    investment_fund: any;
    user: string;
    certified_by: string;
}

interface IPaymentRecordDocument extends IPaymentRecord, Document {}
interface IPaymentRecordModel extends Model<IPaymentRecordDocument> {}

//postSchema->Document->Model

// const PostModel: IPostModel = Mongoose.model<IPostDocument>("post", postSchema);

const PaymentRecordModel: IPaymentRecordModel =
  Mongoose.models.paymentRecord ||
  Mongoose.model<IPaymentRecordDocument>("paymentRecord", paymentRecordSchema);

export default PaymentRecordModel;
