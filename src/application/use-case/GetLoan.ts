import { RepositoryAbstractFactory } from "../factory/RepositoryAbstractFactory";
import { Output } from "./SimulateLoan";
import { UseCase } from "./UseCase";

type Input = {
  code: string;
};

export class GetLoan implements UseCase {
  loanRepository: any;
  installmentRepository: any;

  constructor(readonly repositoryFactory: RepositoryAbstractFactory) {
    this.loanRepository = repositoryFactory.createLoanRepository();
    this.installmentRepository =
      repositoryFactory.createInstallmentRepository();
  }

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
