import { Connection } from "@App/infra/database/Connection";
import currency from "currency.js";

import { Input, Output } from "./SimulateLoan";

export class RequestLoan {
  constructor() {}

  async execute(input: Input): Promise<void> {
    const connection = new Connection();

    const output: Output = {
      code: input.code,
      installments: [],
    };

    const loanAmount = input.purchasePrice - input.downPayment;
    const loanPeriod = input.period;
    const loanRate = 1;
    const loanType = input.type;

    await connection.query(
      `
      INSERT INTO loan 
      (code, amount, period, rate, type)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [input.code, loanAmount, loanPeriod, loanRate, loanType]
    );

    if (input.salary * 0.25 < loanAmount / loanPeriod) {
      throw new Error("Insufficient salary.");
    }

    let balance = currency(loanAmount);
    let rate = loanRate / 100;
    let installmentNumber = 1;

    if (loanType === "price") {
      let formula = Math.pow(1 + rate, loanPeriod);
      let amount = balance.multiply((formula * rate) / (formula - 1));

      while (balance.value > 0) {
        let interest = balance.multiply(rate);
        let amortization = amount.subtract(interest);

        balance = balance.subtract(amortization);

        if (balance.value <= 0.05) balance = currency(0);

        await connection.query(
          `
          INSERT INTO installment 
          (loan_code, number, amount, interest, amortization, balance)
          VALUES ($1, $2, $3, $4, $5, $6)
          `,
          [
            input.code,
            installmentNumber,
            amount.value,
            interest.value,
            amortization.value,
            balance.value,
          ]
        );

        installmentNumber++;
      }
    }

    if (loanType === "sac") {
      let amortization = currency(balance.value / loanPeriod);

      while (balance.value > 0) {
        let initialBalance = currency(balance.value);
        let interest = currency(initialBalance.value * rate);
        let updatedBalance = currency(initialBalance.value + interest.value);
        let amount = currency(interest.value + amortization.value);

        balance = currency(updatedBalance.value - amount.value);

        if (balance.value <= 0.05) balance = currency(0);

        await connection.query(
          `
          INSERT INTO installment 
          (loan_code, number, amount, interest, amortization, balance)
          VALUES ($1, $2, $3, $4, $5, $6)
          `,
          [
            input.code,
            installmentNumber,
            amount.value,
            interest.value,
            amortization.value,
            balance.value,
          ]
        );

        installmentNumber++;
      }
    }

    connection.close();
  }
}
