import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private mpesaPaymentService: MpesaPaymentService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.setAmount(10);

    this.mpesaPaymentService.call(this.form.value).subscribe(
      (res) => console.log(res),
      (error) => console.error('Something went wrong')
    );
  }

  // tslint:disable-next-line: typedef
  get formControls() {
    return this.form.controls;
  }

  private setAmount(amount: any): void {
    this.form.patchValue({ amount });
  }
}
