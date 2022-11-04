import { Installment } from "@App/domain/entities/Installment";
import { LoanPrice } from "@App/domain/entities/LoanPrice";
import { LoanSac } from "@App/domain/entities/LoanSac";

export type LoanType = "price" | "sac";

export type Input = {
  code: string;
  purchasePrice: number;
  downPayment: number;
  salary: number;
  period: number;
  type: LoanType;
};

export type Installments = {
  installmentNumber: number;
  amount: number;
  interest: number;
  amortization: number;
  balance: number;
};

export type Output = {
  code: string;
  installments: Installments[];
};

export class SimulateLoan {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const { code, period, salary, type } = input;

    const output: Output = {
      code,
      installments: [],
    };

    const amount = input.purchasePrice - input.downPayment;
    const rate = 1;

    let installments: Installment[] = [];

    if (type === "price") {
      const loan = new LoanPrice(code, amount, period, rate, salary, type);

      installments = loan.generateInstallments();
    }

    if (type === "sac") {
      const loan = new LoanSac(code, amount, period, rate, salary, type);

      installments = loan.generateInstallments();
    }

    for (const installment of installments) {
      output.installments.push({
        installmentNumber: installment.number,
        amount: installment.amount,
        interest: installment.interest,
        amortization: installment.amortization,
        balance: installment.balance,
      });
    }

    return output;
  }
}
