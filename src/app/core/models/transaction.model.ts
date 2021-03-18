import { MpesaPaymentModel } from 'src/app/mpesa-payment/mpesa-payment.model';

export interface Transaction {
  userID: string;
  username: string;
  mpesaPayment: MpesaPaymentModel;
  content?: [string];
}
