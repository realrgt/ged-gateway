import { MpesaPaymentModel } from 'src/app/mpesa-payment/mpesa-payment.model';

export interface Transaction {
  userID: string;
  username: string;
  amount: number;
  mpesaPayment: MpesaPaymentModel;
  content?: string;
}
