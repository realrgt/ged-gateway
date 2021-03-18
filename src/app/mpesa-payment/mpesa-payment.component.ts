import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../core/models/transaction.model';
import { AuthService } from '../core/services/auth.service';
import { TransactionService } from '../core/services/transaction.service';
import { MpesaPaymentService } from './mpesa-payment.service';

@Component({
  selector: 'app-mpesa-payment',
  templateUrl: './mpesa-payment.component.html',
  styleUrls: ['./mpesa-payment.component.scss'],
})
export class MpesaPaymentComponent implements OnInit {
  form = this.formBuilder.group({
    amount: [''],
    phone: ['258', Validators.required],
  });

  musicList: [string] = ['music1'];

  constructor(
    private formBuilder: FormBuilder,
    private mpesaPaymentService: MpesaPaymentService,
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.setAmount(10);

    this.authService.user$.subscribe((user) => {
      if (user) {
        this.mpesaPaymentService.call(this.form.value).subscribe(
          async (mpesaPayment) => {
            console.log(mpesaPayment);

            if (mpesaPayment.output_ResponseCode === 'INS-0') {
              const transaction: Transaction = {
                userID: user.uid,
                username: user.displayName,
                mpesaPayment,
                content: this.musicList,
              };

              await this.transactionService.addTransaction(transaction);
            }
          },
          (error) => console.error('Something went wrong')
        );
      }
    });
  }

  // tslint:disable-next-line: typedef
  get formControls() {
    return this.form.controls;
  }

  private setAmount(amount: any): void {
    this.form.patchValue({ amount });
  }
}
