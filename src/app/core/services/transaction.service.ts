import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private afs: AngularFirestore) {}

  async addTransaction(
    transaction: Transaction
  ): Promise<DocumentReference<Transaction>> {
    const transactionRef = this.afs.collection<Transaction>(`transactions`);

    const data: Transaction = {
      userID: transaction.userID,
      username: transaction.username,
      amount: transaction.amount,
      mpesaPayment: transaction.mpesaPayment,
      content: transaction.content,
    };

    return transactionRef.add(data);
  }
}
