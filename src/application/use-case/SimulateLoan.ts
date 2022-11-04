import { Installment } from "@App/domain/entities/Installment";
import { InstallmentGeneratorPrice } from "@App/domain/entities/InstallmentGeneratorPrice";
import { InstallmentGeneratorSac } from "@App/domain/entities/InstallmentGeneratorSac";
import { InstallmentGeneratorFactory } from "@App/domain/factory/InstallmentGeneratorFactory";

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

    const generatorInstallment = InstallmentGeneratorFactory.create(loanType);

    const installments = await generatorInstallment.generator(
      input.code,
      loanAmount,
      loanPeriod,
      loanRate
    );

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
