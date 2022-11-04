import { InstallmentRepository } from "@App/application/repositories/InstallmentRepository";
import { LoanRepository } from "@App/application/repositories/LoanRepository";
import { Installment } from "@App/domain/entities/Installment";
import { Loan } from "@App/domain/entities/Loan";
import { InstallmentGeneratorFactory } from "@App/domain/factory/InstallmentGeneratorFactory";
import { Input } from "./SimulateLoan";

export class RequestLoan {
  constructor(
    readonly loanRepository: LoanRepository,
    readonly installmentRepository: InstallmentRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const loanAmount = input.purchasePrice - input.downPayment;
    const loanPeriod = input.period;
    const loanRate = 1;
    const loanType = input.type;

    await this.loanRepository.save(
      new Loan(input.code, loanAmount, loanPeriod, loanRate, loanType)
    );

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
      await this.installmentRepository.save(
        new Installment(
          input.code,
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
