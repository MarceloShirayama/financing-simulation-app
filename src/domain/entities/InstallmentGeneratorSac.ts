import currency from "currency.js";

import { InstallmentGenerator } from "./InstallmentGenerator";
import { Installment } from "./Installment";

export class InstallmentGeneratorSac implements InstallmentGenerator {
  async generator(
    loanCode: string,
    loanAmount: number,
    loanPeriod: number,
    loanRate: number
  ): Promise<Installment[]> {
    const installments: Installment[] = [];

    let balance = currency(loanAmount);
    let rate = loanRate / 100;
    let installmentNumber = 1;

    let amortization = currency(balance.value / loanPeriod);

    while (balance.value > 0) {
      let initialBalance = currency(balance.value);
      let interest = currency(initialBalance.value * rate);
      let updatedBalance = currency(initialBalance.value + interest.value);
      let amount = currency(interest.value + amortization.value);

      balance = currency(updatedBalance.value - amount.value);

      if (balance.value <= 0.05) balance = currency(0);

      installments.push(
        new Installment(
          loanCode,
          installmentNumber,
          amount.value,
          interest.value,
          amortization.value,
          balance.value
        )
      );

      installmentNumber++;
    }

    return installments;
  }
}
