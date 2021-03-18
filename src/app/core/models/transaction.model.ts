import { MpesaPaymentModel } from 'src/app/mpesa-payment/mpesa-payment.model';

export interface Transaction {
  uid: string;
  userID: string;
  username: string;
  mpesaPayment: MpesaPaymentModel;
  content?: [string];
}
