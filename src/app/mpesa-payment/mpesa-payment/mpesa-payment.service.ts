import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MpesaPaymentModel } from './mpesa-payment.model';

@Injectable({ providedIn: 'root' })
export class MpesaPaymentService {
  constructor(private http: HttpClient) {}

  public call({ amount, phone }: any): Observable<MpesaPaymentModel> {
    const params = new HttpParams()
      .append('amount', amount)
      .append('phone', phone);

    return this.http
      .post<MpesaPaymentModel>(
        `${environment.api}/transaction/buy`,
        {},
        { params }
      )
      .pipe(
        take(1),
        tap(console.log),
        map((res) => res.payment as MpesaPaymentModel)
      );
  }
}
