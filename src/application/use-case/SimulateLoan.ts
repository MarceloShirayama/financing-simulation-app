import currency from "currency.js";

type LoanType = "price" | "sac";

export type Input = {
  code: string;
  purchasePrice: number;
  downPayment: number;
  salary: number;
  period: number;
  type: LoanType;
};

type Installments = {
  installmentNumber: number;
  amount: number;
  interest: number;
  amortization: number;
  balance: number;
};

type Output = {
  code: string;
  installments: Installments[];
};

export class SimulateLoan {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const output: Output = {
      code: input.code,
      installments: [],
    };

    const loanAmount = input.purchasePrice - input.downPayment;
    const loanPeriod = input.period;
    const loanRate = 1;
    const loanType = input.type;

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

        output.installments.push({
          installmentNumber,
          amount: amount.value,
          interest: interest.value,
          amortization: amortization.value,
          balance: balance.value,
        });
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

        output.installments.push({
          installmentNumber,
          amount: amount.value,
          interest: interest.value,
          amortization: amortization.value,
          balance: balance.value,
        });

        installmentNumber++;
      }
    }

    return output;
  }
}
