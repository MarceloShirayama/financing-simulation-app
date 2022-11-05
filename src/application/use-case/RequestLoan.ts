import { InstallmentRepository } from "@App/application/repositories/InstallmentRepository";
import { LoanRepository } from "@App/application/repositories/LoanRepository";
import { Installment } from "@App/domain/entities/Installment";
import { Loan } from "@App/domain/entities/Loan";
import { InstallmentGeneratorFactory } from "@App/domain/factory/InstallmentGeneratorFactory";
import { RepositoryAbstractFactory } from "../factory/RepositoryAbstractFactory";
import { Input } from "./SimulateLoan";

export class RequestLoan {
  loanRepository: LoanRepository;
  installmentRepository: InstallmentRepository;

  constructor(readonly repositoryFactory: RepositoryAbstractFactory) {
    this.loanRepository = repositoryFactory.createLoanRepository();
    this.installmentRepository =
      repositoryFactory.createInstallmentRepository();
  }

  async execute(input: Input): Promise<void> {
    const { code, period, salary, type, purchasePrice, downPayment } = input;

    const amount = purchasePrice - downPayment;
    const rate = 1;

    await this.loanRepository.save(
      new Loan(code, amount, period, rate, salary, type)
    );

    const generatorInstallment = InstallmentGeneratorFactory.create(type);

    const installments = await generatorInstallment.generator(
      code,
      amount,
      period,
      rate
    );

    for (const installment of installments) {
      await this.installmentRepository.save(
        new Installment(
          code,
          installment.number,
          installment.amount,
          installment.interest,
          installment.amortization,
          installment.balance
        )
      );
    }
  }
}
