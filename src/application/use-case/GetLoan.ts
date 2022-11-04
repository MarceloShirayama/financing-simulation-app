import { InstallmentRepository } from "@App/application/repositories/InstallmentRepository";
import { LoanRepository } from "@App/application/repositories/LoanRepository";
import { Output } from "./SimulateLoan";

type Input = {
  code: string;
};

export class GetLoan {
  constructor(
    readonly loanRepository: LoanRepository,
    readonly installmentRepository: InstallmentRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const loan = await this.loanRepository.get(input.code);

    const installments = await this.installmentRepository.getByCode(loan.code);

    const output: Output = {
      code: loan.code,
      installments: [],
    };

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
