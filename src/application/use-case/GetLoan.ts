import { InstallmentDatabaseRepository } from "@App/infra/database/repositories/InstallmentDatabaseRepository";
import { LoanDatabaseRepository } from "@App/infra/database/repositories/LoanDatabaseRepository";
import { Output } from "./SimulateLoan";

type Input = {
  code: string;
};

export class GetLoan {
  constructor(
    readonly loanDatabaseRepository: LoanDatabaseRepository,
    readonly installmentDatabaseRepository: InstallmentDatabaseRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const loan = await this.loanDatabaseRepository.get(input.code);

    const installments = await this.installmentDatabaseRepository.getByCode(
      loan.code
    );

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
